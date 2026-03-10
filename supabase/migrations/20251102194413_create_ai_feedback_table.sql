/*
  # Create AI Feedback Table

  1. New Tables
    - `ai_feedback`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `question_id` (text) - identifies which question was answered
      - `recording_url` (text) - URL to the audio recording
      - `predicted_band` (integer) - AI predicted band score (1-9)
      - `confidence` (numeric) - confidence score (0-1)
      - `fluency_feedback` (text) - feedback on fluency
      - `vocabulary_feedback` (text) - feedback on vocabulary
      - `grammar_feedback` (text) - feedback on grammar
      - `pronunciation_feedback` (text) - feedback on pronunciation
      - `strengths` (jsonb) - array of strengths
      - `improvements` (jsonb) - array of improvements
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `ai_feedback` table
    - Add policy for users to read their own feedback
    - Add policy for authenticated users to insert their own feedback

  3. Notes
    - Stores comprehensive AI analysis results
    - Users can track their progress over time
    - One-to-one relationship with speaking_practice via question_id
*/

CREATE TABLE IF NOT EXISTS ai_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id text NOT NULL,
  recording_url text NOT NULL,
  predicted_band integer NOT NULL CHECK (predicted_band >= 1 AND predicted_band <= 9),
  confidence numeric NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  fluency_feedback text NOT NULL,
  vocabulary_feedback text NOT NULL,
  grammar_feedback text NOT NULL,
  pronunciation_feedback text NOT NULL,
  strengths jsonb NOT NULL DEFAULT '[]'::jsonb,
  improvements jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
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
    WHERE conname = 'ai_feedback_user_question_unique'
  ) THEN
    ALTER TABLE ai_feedback 
    ADD CONSTRAINT ai_feedback_user_question_unique 
    UNIQUE (user_id, question_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_ai_feedback_user_id ON ai_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_feedback_question_id ON ai_feedback(question_id);
CREATE INDEX IF NOT EXISTS idx_ai_feedback_created_at ON ai_feedback(created_at DESC);
