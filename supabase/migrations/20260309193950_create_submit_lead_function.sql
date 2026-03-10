/*
  # Create secure function for submitting leads

  1. New Function
    - `submit_lead` - SECURITY DEFINER function that bypasses RLS
    - Takes all lead fields as parameters
    - Returns the inserted lead ID
    - Validates consented = true before inserting

  2. Security
    - Function runs as definer (owner) to bypass RLS
    - Still validates consent requirement
    - Grants execute to anon and authenticated roles
*/

CREATE OR REPLACE FUNCTION submit_lead(
  p_name text,
  p_email text,
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
BEGIN
  IF NOT p_consented THEN
    RAISE EXCEPTION 'Consent is required to submit a lead';
  END IF;

  IF p_name IS NULL OR p_name = '' THEN
    RAISE EXCEPTION 'Name is required';
  END IF;

  IF p_email IS NULL OR p_email = '' THEN
    RAISE EXCEPTION 'Email is required';
  END IF;

  INSERT INTO leads (name, email, phone, skills, challenges, details, consented, wants_ebook)
  VALUES (p_name, p_email, p_phone, p_skills, p_challenges, p_details, p_consented, p_wants_ebook)
  RETURNING id INTO new_id;

  RETURN new_id;
END;
$$;

-- Grant execute to anon and authenticated
GRANT EXECUTE ON FUNCTION submit_lead TO anon;
GRANT EXECUTE ON FUNCTION submit_lead TO authenticated;