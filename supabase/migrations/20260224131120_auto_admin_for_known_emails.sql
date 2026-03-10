/*
  # Auto-assign admin role for designated admin email addresses

  ## Summary
  Updates the handle_new_user trigger function so that when jplayer09@icloud.com
  or consultation@bespokeielts.com sign up, their profile is immediately created
  with the 'admin' role instead of the default 'user' role.

  ## Changes
  - Modified handle_new_user() function to check the new user's email and assign
    'admin' role for the two designated admin addresses.
*/

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  assigned_role text;
BEGIN
  IF NEW.email IN ('jplayer09@icloud.com', 'consultation@bespokeielts.com') THEN
    assigned_role := 'admin';
  ELSE
    assigned_role := 'user';
  END IF;

  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, assigned_role)
  ON CONFLICT (id) DO UPDATE SET role = assigned_role, updated_at = now();

  RETURN NEW;
END;
$$;
