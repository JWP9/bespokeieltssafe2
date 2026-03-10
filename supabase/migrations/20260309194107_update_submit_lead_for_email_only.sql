/*
  # Update submit_lead function to handle email-only subscriptions

  1. Changes
    - Make p_name and p_challenges parameters optional with sensible defaults
    - Email-only subscriptions will use placeholder values
    - Full lead submissions continue to work as before

  2. Security
    - Function still runs as definer (owner)
    - Still validates consent requirement
*/

CREATE OR REPLACE FUNCTION submit_lead(
  p_name text DEFAULT NULL,
  p_email text DEFAULT NULL,
  p_phone text DEFAULT NULL,
  p_skills jsonb DEFAULT NULL,
  p_challenges text DEFAULT NULL,
  p_details text DEFAULT NULL,
  p_consented boolean DEFAULT false,
  p_wants_ebook boolean DEFAULT false
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_id uuid;
  actual_name text;
  actual_challenges text;
BEGIN
  IF NOT p_consented THEN
    RAISE EXCEPTION 'Consent is required to submit a lead';
  END IF;

  IF p_email IS NULL OR p_email = '' THEN
    RAISE EXCEPTION 'Email is required';
  END IF;

  -- Use defaults for email-only subscriptions
  actual_name := COALESCE(NULLIF(p_name, ''), 'Email Subscriber');
  actual_challenges := COALESCE(NULLIF(p_challenges, ''), 'Email subscription');

  INSERT INTO leads (name, email, phone, skills, challenges, details, consented, wants_ebook)
  VALUES (actual_name, p_email, p_phone, p_skills, actual_challenges, p_details, p_consented, p_wants_ebook)
  RETURNING id INTO new_id;

  RETURN new_id;
END;
$$;