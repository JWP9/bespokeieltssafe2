/*
  # Create speaking_scores table for AI band score estimates

  1. New Tables
    - `speaking_scores`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid, foreign key) - References auth.users
      - `part` (integer) - Speaking part (1, 2, or 3)
      - `topic` (text) - Topic name
      - `transcript` (text) - Transcribed speech
      - `band_score` (decimal) - Overall band score (0-9)
      - `fluency_score` (decimal) - Fluency and coherence score
      - `vocabulary_score` (decimal) - Lexical resource score
      - `grammar_score` (decimal) - Grammatical range and accuracy score
      - `pronunciation_score` (decimal) - Pronunciation score
      - `tips` (text) - AI-generated improvement tips
      - `words_per_minute` (integer) - Speaking speed metric
      - `pause_count` (integer) - Number of pauses detected
      - `created_at` (timestamptz) - Timestamp of scoring
  
  2. Security
    - Enable RLS on `speaking_scores` table
    - Add policy for authenticated users to insert their own scores
    - Add policy for users to read only their own scores
*/

CREATE TABLE IF NOT EXISTS speaking_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  part integer NOT NULL CHECK (part IN (1, 2, 3)),
  topic text NOT NULL,
  transcript text NOT NULL,
  band_score decimal(3,1) NOT NULL CHECK (band_score >= 0 AND band_score <= 9),
  fluency_score decimal(3,1) CHECK (fluency_score >= 0 AND fluency_score <= 9),
  vocabulary_score decimal(3,1) CHECK (vocabulary_score >= 0 AND vocabulary_score <= 9),
  grammar_score decimal(3,1) CHECK (grammar_score >= 0 AND grammar_score <= 9),
  pronunciation_score decimal(3,1) CHECK (pronunciation_score >= 0 AND pronunciation_score <= 9),
  tips text,
  words_per_minute integer,
  pause_count integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE speaking_scores ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own scores
CREATE POLICY "Users can save scores"
  ON speaking_scores
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can read only their own scores
CREATE POLICY "Users can view own scores"
  ON speaking_scores
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_speaking_scores_user_id ON speaking_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_speaking_scores_created_at ON speaking_scores(created_at DESC);
