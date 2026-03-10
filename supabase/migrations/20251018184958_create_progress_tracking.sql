/*
  # IELTS Progress Tracking System

  ## Overview
  Creates a secure system for tracking IELTS student progress with user authentication

  ## New Tables
  
  ### `progress`
  Stores individual progress entries for IELTS skills practice
  - `id` (uuid, primary key) - Unique identifier for each progress entry
  - `user_id` (uuid, foreign key) - References auth.users, identifies the student
  - `skill` (text) - IELTS skill type (Listening, Reading, Writing, Speaking)
  - `score` (numeric) - Band score achieved (0-9 with 0.5 increments)
  - `test_type` (text) - Type of test taken (e.g., "Mock Test", "Practice Exercise")
  - `notes` (text, optional) - Additional notes about the practice session
  - `date` (timestamptz) - Timestamp when the score was recorded
  - `created_at` (timestamptz) - Auto-generated creation timestamp

  ## Security
  
  ### Row Level Security (RLS)
  - RLS enabled on `progress` table
  - Users can only view their own progress entries
  - Users can only insert their own progress entries
  - Users can only update their own progress entries
  - Users can only delete their own progress entries
  
  ### Key Security Features
  1. All policies verify user authentication
  2. All policies check ownership via user_id matching auth.uid()
  3. No public access - authentication required for all operations
*/

-- Create progress table
CREATE TABLE IF NOT EXISTS progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skill text NOT NULL CHECK (skill IN ('Listening', 'Reading', 'Writing', 'Speaking')),
  score numeric NOT NULL CHECK (score >= 0 AND score <= 9),
  test_type text NOT NULL DEFAULT 'Practice Exercise',
  notes text,
  date timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own progress
CREATE POLICY "Users can view own progress"
  ON progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own progress
CREATE POLICY "Users can insert own progress"
  ON progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own progress
CREATE POLICY "Users can update own progress"
  ON progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own progress
CREATE POLICY "Users can delete own progress"
  ON progress
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_date ON progress(date DESC);