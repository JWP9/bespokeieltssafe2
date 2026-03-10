/*
  # Create user_topics table for user-submitted speaking topics

  1. New Tables
    - `user_topics`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid, foreign key) - References auth.users, nullable for guest submissions
      - `topic` (text) - Topic name
      - `questions` (jsonb) - Array of question strings
      - `answers` (jsonb) - Optional array of answer strings
      - `approved` (boolean) - Moderation flag, defaults to false
      - `created_at` (timestamptz) - Timestamp of submission
  
  2. Security
    - Enable RLS on `user_topics` table
    - Add policy for authenticated users to insert their own topics
    - Add policy for authenticated users to read approved topics
    - Add policy for users to read their own topics (approved or not)
*/

CREATE TABLE IF NOT EXISTS user_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  topic text NOT NULL,
  questions jsonb NOT NULL,
  answers jsonb,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_topics ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own topics
CREATE POLICY "Users can submit topics"
  ON user_topics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can read approved topics
CREATE POLICY "Users can view approved topics"
  ON user_topics
  FOR SELECT
  TO authenticated
  USING (approved = true);

-- Policy: Users can read their own topics
CREATE POLICY "Users can view own topics"
  ON user_topics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_topics_approved ON user_topics(approved);
CREATE INDEX IF NOT EXISTS idx_user_topics_user_id ON user_topics(user_id);
