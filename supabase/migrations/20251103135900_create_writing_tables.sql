/*
  # Create writing practice tables

  1. New Tables
    - `writing_task1`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid, foreign key) - References auth.users
      - `prompt` (text) - The chart/graph description prompt
      - `response` (text) - User's written response
      - `word_count` (integer) - Number of words in response
      - `created_at` (timestamptz) - Timestamp of submission
    
    - `writing_task2`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid, foreign key) - References auth.users
      - `prompt` (text) - The essay prompt
      - `response` (text) - User's written essay
      - `band` (jsonb) - Band scores and feedback
      - `word_count` (integer) - Number of words in response
      - `created_at` (timestamptz) - Timestamp of submission
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to insert their own work
    - Add policies for users to read only their own submissions
*/

CREATE TABLE IF NOT EXISTS writing_task1 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  prompt text NOT NULL,
  response text NOT NULL,
  word_count integer NOT NULL CHECK (word_count >= 0),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS writing_task2 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  prompt text NOT NULL,
  response text NOT NULL,
  band jsonb,
  word_count integer NOT NULL CHECK (word_count >= 0),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE writing_task1 ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_task2 ENABLE ROW LEVEL SECURITY;

-- Policies for writing_task1
CREATE POLICY "Users can insert own Task 1 submissions"
  ON writing_task1
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own Task 1 submissions"
  ON writing_task1
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for writing_task2
CREATE POLICY "Users can insert own Task 2 submissions"
  ON writing_task2
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own Task 2 submissions"
  ON writing_task2
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_writing_task1_user_id ON writing_task1(user_id);
CREATE INDEX IF NOT EXISTS idx_writing_task1_created_at ON writing_task1(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_writing_task2_user_id ON writing_task2(user_id);
CREATE INDEX IF NOT EXISTS idx_writing_task2_created_at ON writing_task2(created_at DESC);
