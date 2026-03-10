/*
  # Fix set_trial_for_user to preserve admin role

  ## Problem
  When an admin email signs up via the trial flow, two things happen:
  1. The handle_new_user trigger correctly assigns role = 'admin'
  2. The set_trial_for_user() RPC is then called, which overwrites role = 'premium_trial'

  This demotes the admin to a trial user, hiding all admin UI.

  ## Fix
  Update set_trial_for_user() so it skips the update entirely if the user's
  current role is already 'admin'. Admins always have full access and should
  never be put on a trial.
*/

CREATE OR REPLACE FUNCTION set_trial_for_user(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  current_role text;
BEGIN
  SELECT role INTO current_role FROM public.profiles WHERE id = user_id;

  IF current_role = 'admin' THEN
    RETURN;
  END IF;

  INSERT INTO public.profiles (id, role, trial_end)
  VALUES (user_id, 'premium_trial', now() + interval '7 days')
  ON CONFLICT (id) DO UPDATE
    SET role = 'premium_trial',
        trial_end = now() + interval '7 days',
        updated_at = now();
END;
$$;
