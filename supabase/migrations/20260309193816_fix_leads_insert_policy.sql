/*
  # Fix leads table INSERT policy

  1. Changes
    - Drop existing INSERT policy
    - Recreate INSERT policy with explicit permissions for anon and authenticated roles
    - Ensure the policy allows form submissions when consented = true

  2. Security
    - RLS remains enabled
    - INSERT allowed for anon and authenticated when consented = true
    - No other changes to existing policies
*/

-- Drop existing INSERT policy if it exists
DROP POLICY IF EXISTS "Anyone can submit a lead" ON leads;

-- Recreate INSERT policy with explicit settings
CREATE POLICY "Anyone can submit a lead"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (consented = true);

-- Ensure proper grants exist
GRANT INSERT ON leads TO anon;
GRANT INSERT ON leads TO authenticated;