/*
  # Fix AI Feedback Table - Use question_id

  1. Changes
    - Rename recording_id to question_id to match speaking_practice table
    - Change type from uuid to text to match speaking_practice.question_id
    - Update unique constraint
    - Update indexes

  2. Notes
    - This aligns with the speaking_practice table which uses question_id (text)
    - Frontend already uses question_id for tracking recordings
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'ai_feedback' AND column_name = 'recording_id'
  ) THEN
    ALTER TABLE ai_feedback 
    DROP CONSTRAINT IF EXISTS ai_feedback_user_recording_unique;
    
    ALTER TABLE ai_feedback 
    RENAME COLUMN recording_id TO question_id;
    
    ALTER TABLE ai_feedback 
    ALTER COLUMN question_id TYPE text;
    
    DROP INDEX IF EXISTS idx_ai_feedback_recording_id;
    
    CREATE INDEX IF NOT EXISTS idx_ai_feedback_question_id ON ai_feedback(question_id);
    
    ALTER TABLE ai_feedback 
    DROP CONSTRAINT IF EXISTS ai_feedback_user_question_unique;
    
    ALTER TABLE ai_feedback 
    ADD CONSTRAINT ai_feedback_user_question_unique 
    UNIQUE (user_id, question_id);
  END IF;
END $$;
