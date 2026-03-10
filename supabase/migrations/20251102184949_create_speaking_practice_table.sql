/*
  # Create speaking_practice table

  1. New Tables
    - `speaking_practice`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `part` (integer, 1-3 for IELTS Speaking parts)
      - `topic` (text, the topic practiced)
      - `question_id` (text, identifier for the specific question)
      - `recording_url` (text, URL to stored audio recording)
      - `self_band` (integer, self-assessed band score 1-9)
      - `created_at` (timestamptz, when the practice was recorded)

  2. Security
    - Enable RLS on `speaking_practice` table
    - Add policy for authenticated users to read their own practice records
    - Add policy for authenticated users to insert their own practice records
    - Add policy for authenticated users to update their own practice records
    - Add policy for authenticated users to delete their own practice records

  3. Notes
    - Users can record and track their speaking practice attempts
    - Self-assessment helps users monitor their progress
    - Each practice session is tied to a specific part and question
*/

CREATE TABLE IF NOT EXISTS speaking_practice (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  part integer NOT NULL CHECK (part >= 1 AND part <= 3),
  topic text NOT NULL,
  question_id text NOT NULL,
  recording_url text,
  self_band integer CHECK (self_band >= 1 AND self_band <= 9),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE speaking_practice ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own speaking practice"
  ON speaking_practice
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own speaking practice"
  ON speaking_practice
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own speaking practice"
  ON speaking_practice
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own speaking practice"
  ON speaking_practice
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_speaking_practice_user_id ON speaking_practice(user_id);
CREATE INDEX IF NOT EXISTS idx_speaking_practice_created_at ON speaking_practice(created_at DESC);
