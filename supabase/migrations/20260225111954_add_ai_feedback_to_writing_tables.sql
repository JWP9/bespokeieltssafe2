/*
  # Add ai_feedback column to writing tables

  ## Summary
  Adds a dedicated `ai_feedback` JSONB column to both writing tables so that
  AI-generated feedback from OpenAI can be persisted alongside each submission.

  ## Changes
  - `writing_task1`: add `ai_feedback` JSONB column (default empty object)
  - `writing_task2`: add `ai_feedback` JSONB column (default empty object)
    (the existing `band` column is kept for backwards compatibility)

  ## Notes
  - Uses IF NOT EXISTS guard to be idempotent
  - No data loss — additive only
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'writing_task1' AND column_name = 'ai_feedback'
  ) THEN
    ALTER TABLE writing_task1 ADD COLUMN ai_feedback jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'writing_task2' AND column_name = 'ai_feedback'
  ) THEN
    ALTER TABLE writing_task2 ADD COLUMN ai_feedback jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;
