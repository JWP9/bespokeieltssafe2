/*
  # Create reading progress tracking table

  1. New Tables
    - `reading_progress`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid) - References auth.users
      - `passage_id` (integer) - ID of completed passage
      - `raw_score` (integer) - Number of correct answers (out of 40)
      - `band` (decimal) - IELTS band score (6.0-9.0)
      - `question_errors` (jsonb) - Details of incorrect answers
      - `ai_feedback` (jsonb) - AI-generated feedback and corrections
      - `created_at` (timestamptz) - Completion timestamp
  
  2. Security
    - Enable RLS on `reading_progress` table
    - Users can only read/write their own progress
*/

CREATE TABLE IF NOT EXISTS reading_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  passage_id integer NOT NULL,
  raw_score integer NOT NULL CHECK (raw_score >= 0 AND raw_score <= 40),
  band decimal(2,1) NOT NULL CHECK (band >= 1.0 AND band <= 9.0),
  question_errors jsonb DEFAULT '[]'::jsonb,
  ai_feedback jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reading progress"
  ON reading_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reading progress"
  ON reading_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reading progress"
  ON reading_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reading progress"
  ON reading_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_reading_progress_user ON reading_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_reading_progress_passage ON reading_progress(passage_id);
CREATE INDEX IF NOT EXISTS idx_reading_progress_created ON reading_progress(created_at DESC);
