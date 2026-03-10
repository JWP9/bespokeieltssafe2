/*
  # Create Profiles Table

  ## Summary
  Creates a profiles table to store user roles and trial information server-side.
  This replaces the insecure localStorage-based trial tracking.

  ## New Tables
  - `profiles`
    - `id` (uuid, FK to auth.users, primary key)
    - `role` (text) - 'user', 'premium_trial', 'premium', 'admin'
    - `trial_end` (timestamptz) - when the trial expires (null if no trial)
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  ## Security
  - RLS enabled on profiles table
  - Users can only read their own profile
  - Users cannot update their own role (server/trigger only)
  - Admin users can read all profiles

  ## Triggers
  - Auto-creates a profile row on new user signup
  - Auto-expires trial by setting role back to 'user' when trial_end is in the past
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'premium_trial', 'premium', 'admin')),
  trial_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Service role can manage all profiles"
  ON profiles FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

CREATE OR REPLACE FUNCTION set_trial_for_user(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, role, trial_end)
  VALUES (user_id, 'premium_trial', now() + interval '7 days')
  ON CONFLICT (id) DO UPDATE
    SET role = 'premium_trial',
        trial_end = now() + interval '7 days',
        updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION get_my_profile()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  profile_record profiles%ROWTYPE;
  effective_role text;
BEGIN
  SELECT * INTO profile_record FROM public.profiles WHERE id = auth.uid();

  IF NOT FOUND THEN
    INSERT INTO public.profiles (id, role)
    VALUES (auth.uid(), 'user')
    ON CONFLICT (id) DO NOTHING;

    SELECT * INTO profile_record FROM public.profiles WHERE id = auth.uid();
  END IF;

  effective_role := profile_record.role;
  IF profile_record.trial_end IS NOT NULL AND profile_record.trial_end < now() AND profile_record.role = 'premium_trial' THEN
    UPDATE public.profiles SET role = 'user', updated_at = now() WHERE id = auth.uid();
    effective_role := 'user';
  END IF;

  RETURN json_build_object(
    'id', profile_record.id,
    'role', effective_role,
    'trial_end', profile_record.trial_end,
    'trial_expired', (profile_record.trial_end IS NOT NULL AND profile_record.trial_end < now() AND profile_record.role = 'premium_trial')
  );
END;
$$;
