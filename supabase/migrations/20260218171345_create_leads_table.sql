/*
  # Create leads table for GDPR-compliant lead capture

  1. New Tables
    - `leads`
      - `id` (uuid, primary key, auto-generated)
      - `name` (text, required) - Full name of the lead
      - `email` (text, required) - Email address
      - `phone` (text, optional) - Phone number
      - `skills` (jsonb, optional) - Array of selected IELTS skills (Reading, Writing, Speaking, Listening, All Skills)
      - `challenges` (text, required) - Description of IELTS challenges
      - `details` (text, optional) - Additional details such as timeline, budget, notes
      - `consented` (boolean, default false) - GDPR consent flag
      - `created_at` (timestamptz, default now()) - Submission timestamp

  2. Security
    - Enable RLS on `leads` table
    - Allow anonymous users to INSERT (submit the form without being logged in)
    - Only authenticated admins can SELECT (read leads)

  3. Notes
    - consented must be true before insertion (enforced at application level)
    - No soft-delete or update policies needed for this use case
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  skills jsonb,
  challenges text NOT NULL,
  details text,
  consented boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (consented = true);

CREATE POLICY "Authenticated users can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);
