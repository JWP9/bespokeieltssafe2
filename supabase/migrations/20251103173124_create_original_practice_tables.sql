/*
  # Create original practice content tables

  1. New Tables
    - `writing_original`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid, foreign key) - References auth.users
      - `task_type` (integer) - 1 for Task 1, 2 for Task 2
      - `prompt` (text) - The writing prompt
      - `response` (text) - User's written response
      - `ai_feedback` (jsonb) - Detailed AI feedback with band scores and tips
      - `word_count` (integer) - Number of words
      - `created_at` (timestamptz) - Timestamp
    
    - `listening_original`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid, foreign key) - References auth.users
      - `section` (integer) - Section number (1-4)
      - `answers` (jsonb) - User's answers
      - `score` (decimal) - Raw score out of 9
      - `band_score` (decimal) - Converted band score
      - `ai_feedback` (jsonb) - Detailed feedback
      - `created_at` (timestamptz) - Timestamp
  
  2. Security
    - Enable RLS on both tables
    - Users can insert and read only their own submissions
*/

CREATE TABLE IF NOT EXISTS writing_original (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  task_type integer NOT NULL CHECK (task_type IN (1, 2)),
  prompt text NOT NULL,
  response text NOT NULL,
  ai_feedback jsonb,
  word_count integer NOT NULL CHECK (word_count >= 0),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS listening_original (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  section integer NOT NULL CHECK (section >= 1 AND section <= 4),
  answers jsonb NOT NULL,
  score integer NOT NULL CHECK (score >= 0 AND score <= 40),
  band_score decimal(3,1) CHECK (band_score >= 0 AND band_score <= 9),
  ai_feedback jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE writing_original ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_original ENABLE ROW LEVEL SECURITY;

-- Policies for writing_original
CREATE POLICY "Users can insert own writing"
  ON writing_original
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own writing"
  ON writing_original
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for listening_original
CREATE POLICY "Users can insert own listening"
  ON listening_original
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own listening"
  ON listening_original
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_writing_original_user_id ON writing_original(user_id);
CREATE INDEX IF NOT EXISTS idx_writing_original_created_at ON writing_original(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listening_original_user_id ON listening_original(user_id);
CREATE INDEX IF NOT EXISTS idx_listening_original_created_at ON listening_original(created_at DESC);
