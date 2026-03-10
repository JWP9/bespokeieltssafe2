/*
  # Add wants_ebook column to leads table

  1. Modified Tables
    - `leads`
      - `wants_ebook` (boolean, default false) - Optional flag indicating the user opted in to receive a free IELTS ebook and occasional tips

  2. Notes
    - This field is optional and defaults to false
    - No RLS changes needed; existing policies cover this column
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'wants_ebook'
  ) THEN
    ALTER TABLE leads ADD COLUMN wants_ebook boolean NOT NULL DEFAULT false;
  END IF;
END $$;
