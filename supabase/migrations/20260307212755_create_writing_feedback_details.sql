/*
  # Create Writing Feedback Details Table

  1. New Table
    - `writing_feedback_details`
      - Stores detailed IELTS expert feedback for each writing submission
      - Tracks strengths, areas to improve, and actionable tips
      - Linked to writing_original submissions

  2. Structure
    - Each writing submission gets one feedback record
    - Stores feedback in structured JSON format (strengths, improvements, tip)
    - Tracks feedback generation timestamp

  3. Security
    - Enable RLS on `writing_feedback_details` table
    - Add policy for users to read their own feedback
    - Foreign key to writing_original ensures referential integrity

  4. Notes
    - Feedback is immutable once generated
    - Scores stored as decimals (0.5 to 9 scale)
    - Multiple strengths/areas can be stored in arrays
*/

CREATE TABLE IF NOT EXISTS writing_feedback_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  writing_id uuid NOT NULL REFERENCES writing_original(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_type integer NOT NULL CHECK (task_type IN (1, 2)),
  
  -- IELTS Assessment Criteria Scores
  task_achievement_score numeric(3,1) CHECK (task_achievement_score >= 0.5 AND task_achievement_score <= 9),
  coherence_cohesion_score numeric(3,1) CHECK (coherence_cohesion_score >= 0.5 AND coherence_cohesion_score <= 9),
  lexical_resource_score numeric(3,1) CHECK (lexical_resource_score >= 0.5 AND lexical_resource_score <= 9),
  grammatical_accuracy_score numeric(3,1) CHECK (grammatical_accuracy_score >= 0.5 AND grammatical_accuracy_score <= 9),
  overall_band numeric(3,1) CHECK (overall_band >= 0.5 AND overall_band <= 9),
  
  -- Feedback Content (Structured for IELTS Expert Format)
  strengths text[] NOT NULL DEFAULT '{}',
  areas_to_improve text[] NOT NULL DEFAULT '{}',
  bespoke_tip text NOT NULL DEFAULT '',
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE writing_feedback_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own writing feedback"
  ON writing_feedback_details
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own writing feedback"
  ON writing_feedback_details
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_writing_feedback_details_user_id ON writing_feedback_details(user_id);
CREATE INDEX idx_writing_feedback_details_writing_id ON writing_feedback_details(writing_id);
