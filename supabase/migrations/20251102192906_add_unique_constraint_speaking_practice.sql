/*
  # Add unique constraint to speaking_practice table

  1. Changes
    - Add unique constraint on (user_id, question_id) combination
    - This allows upsert operations when users re-record the same question

  2. Notes
    - Users can only have one practice record per question
    - Re-recording will update the existing record
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'speaking_practice_user_question_unique'
  ) THEN
    ALTER TABLE speaking_practice 
    ADD CONSTRAINT speaking_practice_user_question_unique 
    UNIQUE (user_id, question_id);
  END IF;
END $$;
