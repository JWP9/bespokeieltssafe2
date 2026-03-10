/*
  # Create Listening Progress Table

  1. New Tables
    - `listening_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `test_id` (int) - Test number 1-20
      - `test_type` (text) - 'academic' or 'general'
      - `raw_score` (int) - Number correct out of 40
      - `band` (decimal) - Band score 0-9
      - `answers` (jsonb) - User's answers
      - `errors` (jsonb) - Wrong answers with explanations
      - `ai_feedback` (jsonb) - AI-generated feedback
      - `time_taken` (int) - Seconds taken
      - `completed_at` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `listening_progress` table
    - Add policies for authenticated users to manage their own data
*/

CREATE TABLE IF NOT EXISTS listening_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id int NOT NULL,
  test_type text NOT NULL CHECK (test_type IN ('academic', 'general')),
  raw_score int NOT NULL CHECK (raw_score >= 0 AND raw_score <= 40),
  band decimal(2,1) NOT NULL CHECK (band >= 0 AND band <= 9),
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  errors jsonb NOT NULL DEFAULT '[]'::jsonb,
  ai_feedback jsonb NOT NULL DEFAULT '{}'::jsonb,
  time_taken int NOT NULL DEFAULT 0,
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE listening_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own listening progress"
  ON listening_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own listening progress"
  ON listening_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listening progress"
  ON listening_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own listening progress"
  ON listening_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_listening_progress_user_id ON listening_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_listening_progress_test_id ON listening_progress(test_id);
CREATE INDEX IF NOT EXISTS idx_listening_progress_completed_at ON listening_progress(completed_at DESC);
