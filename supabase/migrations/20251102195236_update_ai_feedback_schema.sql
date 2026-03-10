/*
  # Update AI Feedback Table Schema

  1. Changes
    - Drop existing ai_feedback table and recreate with simplified schema
    - Use recording_id instead of question_id
    - Store band as decimal(2,1) for precise scoring
    - Store feedback as single text field instead of separate columns
    - Use uuid_generate_v4() for id generation

  2. New Schema
    - `id` (uuid, primary key)
    - `user_id` (uuid, foreign key to auth.users)
    - `recording_id` (uuid) - references the recording
    - `band` (decimal 2,1) - AI predicted band score
    - `feedback` (text) - comprehensive feedback as text
    - `created_at` (timestamp)

  3. Security
    - Enable RLS on `ai_feedback` table
    - Add policy for users to read their own feedback
    - Add policy for authenticated users to insert their own feedback
*/

DROP TABLE IF EXISTS ai_feedback CASCADE;

CREATE TABLE ai_feedback (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recording_id uuid,
  band decimal(2,1) NOT NULL CHECK (band >= 0 AND band <= 9),
  feedback text NOT NULL,
  created_at timestamp DEFAULT now()
);

ALTER TABLE ai_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own AI feedback"
  ON ai_feedback
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI feedback"
  ON ai_feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'ai_feedback_user_recording_unique'
  ) THEN
    ALTER TABLE ai_feedback 
    ADD CONSTRAINT ai_feedback_user_recording_unique 
    UNIQUE (user_id, recording_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_ai_feedback_user_id ON ai_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_feedback_recording_id ON ai_feedback(recording_id);
CREATE INDEX IF NOT EXISTS idx_ai_feedback_created_at ON ai_feedback(created_at DESC);
