/*
  # Add length constraints to blog_reads and blog_subscribers

  ## Summary
  Adds column-level length constraints to prevent abuse via oversized payloads,
  and adds an email format check constraint on blog_subscribers.

  ## Changes to blog_reads
  - post_id: max 500 characters
  - post_title: max 500 characters

  ## Changes to blog_subscribers
  - email: max 254 characters (RFC 5321 limit)
  - name: max 200 characters
  - Add CHECK constraint requiring email to contain '@' and '.' and be non-empty

  ## Notes
  1. Uses ALTER TABLE ... ADD CONSTRAINT with IF NOT EXISTS pattern via DO block
  2. No data is dropped or altered — purely additive constraints
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE table_name = 'blog_reads' AND constraint_name = 'blog_reads_post_id_length'
  ) THEN
    ALTER TABLE blog_reads ADD CONSTRAINT blog_reads_post_id_length CHECK (char_length(post_id) <= 500);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE table_name = 'blog_reads' AND constraint_name = 'blog_reads_post_title_length'
  ) THEN
    ALTER TABLE blog_reads ADD CONSTRAINT blog_reads_post_title_length CHECK (char_length(post_title) <= 500);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE table_name = 'blog_subscribers' AND constraint_name = 'blog_subscribers_email_length'
  ) THEN
    ALTER TABLE blog_subscribers ADD CONSTRAINT blog_subscribers_email_length CHECK (char_length(email) <= 254);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE table_name = 'blog_subscribers' AND constraint_name = 'blog_subscribers_email_format'
  ) THEN
    ALTER TABLE blog_subscribers ADD CONSTRAINT blog_subscribers_email_format CHECK (
      email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE table_name = 'blog_subscribers' AND constraint_name = 'blog_subscribers_name_length'
  ) THEN
    ALTER TABLE blog_subscribers ADD CONSTRAINT blog_subscribers_name_length CHECK (name IS NULL OR char_length(name) <= 200);
  END IF;
END $$;
