/*
  # Create Early Bird Config Table

  ## Summary
  Sets up a single-row configuration table to track Early Bird pricing spots.

  ## New Tables
  - `early_bird_config`
    - `id` (integer, primary key, always 1 — enforced by check constraint)
    - `total_spots` (integer) — maximum Early Bird spots available (100)
    - `spots_taken` (integer) — how many spots have been claimed so far
    - `is_active` (boolean) — whether the Early Bird offer is still running
    - `created_at` / `updated_at` (timestamptz)

  ## Security
  - RLS enabled
  - Public read policy so any visitor can see the remaining count
  - No public write policy — only service role (admin) can mutate

  ## Notes
  1. Seeded with 1 row: total_spots=100, spots_taken=0, is_active=true
  2. A helper RPC `get_early_bird_spots_remaining` returns (total_spots - spots_taken)
     so the frontend never needs to do arithmetic itself
*/

CREATE TABLE IF NOT EXISTS early_bird_config (
  id integer PRIMARY KEY DEFAULT 1,
  total_spots integer NOT NULL DEFAULT 100,
  spots_taken integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1),
  CONSTRAINT spots_taken_non_negative CHECK (spots_taken >= 0),
  CONSTRAINT spots_taken_max CHECK (spots_taken <= total_spots)
);

ALTER TABLE early_bird_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read early bird config"
  ON early_bird_config
  FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO early_bird_config (id, total_spots, spots_taken, is_active)
VALUES (1, 100, 0, true)
ON CONFLICT (id) DO NOTHING;

CREATE OR REPLACE FUNCTION get_early_bird_spots_remaining()
RETURNS integer
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT GREATEST(0, total_spots - spots_taken)
  FROM early_bird_config
  WHERE id = 1;
$$;
