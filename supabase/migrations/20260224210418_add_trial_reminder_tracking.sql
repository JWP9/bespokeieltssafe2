/*
  # Add Trial Reminder Tracking to Profiles

  ## Summary
  Adds infrastructure to support Day 6 trial expiry reminder emails and
  audit logging of automatic trial downgrades.

  ## Changes to profiles table
  - `reminder_sent_at` (timestamptz, nullable) — records when the Day 6 reminder
    email was last sent. Prevents duplicate emails from being dispatched.
  - `downgraded_at` (timestamptz, nullable) — records the exact timestamp when
    a premium_trial role was automatically downgraded to 'user' on expiry. Useful
    for auditing and customer support.

  ## Updated Functions
  - `get_my_profile()` — now also writes `downgraded_at = now()` when it downgrades
    an expired trial, and correctly evaluates `trial_expired` before applying the
    role change so the flag is accurate.

  ## Security
  - No changes to RLS policies (inherits existing profile policies)
  - Both new columns are write-protected from the client (only SECURITY DEFINER
    functions and service_role can write them)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'reminder_sent_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN reminder_sent_at timestamptz;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'downgraded_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN downgraded_at timestamptz;
  END IF;
END $$;

CREATE OR REPLACE FUNCTION get_my_profile()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  profile_record profiles%ROWTYPE;
  effective_role text;
  is_expired boolean;
BEGIN
  SELECT * INTO profile_record FROM public.profiles WHERE id = auth.uid();

  IF NOT FOUND THEN
    INSERT INTO public.profiles (id, role)
    VALUES (auth.uid(), 'user')
    ON CONFLICT (id) DO NOTHING;

    SELECT * INTO profile_record FROM public.profiles WHERE id = auth.uid();
  END IF;

  is_expired := (
    profile_record.trial_end IS NOT NULL
    AND profile_record.trial_end < now()
    AND profile_record.role = 'premium_trial'
  );

  effective_role := profile_record.role;

  IF is_expired THEN
    UPDATE public.profiles
    SET role = 'user',
        downgraded_at = now(),
        updated_at = now()
    WHERE id = auth.uid();
    effective_role := 'user';
  END IF;

  RETURN json_build_object(
    'id',            profile_record.id,
    'role',          effective_role,
    'trial_end',     profile_record.trial_end,
    'trial_expired', is_expired
  );
END;
$$;
