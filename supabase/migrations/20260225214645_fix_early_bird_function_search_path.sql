/*
  # Fix get_early_bird_spots_remaining function search_path

  ## Summary
  Adds SET search_path = public to the get_early_bird_spots_remaining function.

  ## Problem
  The function uses SECURITY DEFINER (elevated privileges) but was missing
  SET search_path = public. Without this, a malicious schema prepended to the
  search_path could redirect the table lookup to an attacker-controlled table,
  returning falsified data. All other SECURITY DEFINER functions in this codebase
  already have this fix applied.

  ## Changes
  - Recreates get_early_bird_spots_remaining() with SET search_path = public
*/

CREATE OR REPLACE FUNCTION get_early_bird_spots_remaining()
RETURNS integer
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT GREATEST(0, total_spots - spots_taken)
  FROM early_bird_config
  WHERE id = 1;
$$;
