/*
  # Ensure anon role has all necessary permissions for leads table

  1. Changes
    - Grant USAGE on public schema to anon
    - Grant INSERT on leads table to anon
    - Grant USAGE on sequences for id generation
    - Verify RLS policy is correct

  2. Security
    - Only INSERT permission granted to anon
    - RLS policy still enforces consented = true
*/

-- Ensure anon has schema usage
GRANT USAGE ON SCHEMA public TO anon;

-- Ensure anon can insert into leads
GRANT INSERT ON leads TO anon;

-- Ensure anon can use the default value for uuid generation
GRANT EXECUTE ON FUNCTION gen_random_uuid() TO anon;

-- Double check the policy exists and is correct
DO $$
BEGIN
  -- Drop and recreate to ensure clean state
  DROP POLICY IF EXISTS "Anyone can submit a lead" ON leads;
  
  CREATE POLICY "Anyone can submit a lead"
    ON leads
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (consented = true);
END $$;