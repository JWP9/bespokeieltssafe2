/*
  # Add rate limiting trigger for blog_subscribers

  ## Summary
  Adds a database-level rate limiting mechanism to the blog_subscribers INSERT
  to prevent spam and bulk sign-up abuse.

  ## How It Works
  A BEFORE INSERT trigger checks how many rows have been inserted into
  blog_subscribers within the last 60 seconds. If more than 5 inserts have
  occurred in that window (globally, across all users/IPs), the insert is
  rejected with a clear error message.

  This is a simple global throttle — it does not require tracking IPs or
  sessions, and works without additional tables or extensions.

  ## Security
  - Trigger function uses SECURITY DEFINER with SET search_path = public
  - Prevents batch scraping/spam of the subscriber table
  - Does not affect legitimate single sign-ups

  ## Notes
  1. The threshold (5 per 60 seconds) is generous for real users but blocks bots
  2. The trigger fires BEFORE INSERT so no row is written on rejection
*/

CREATE OR REPLACE FUNCTION check_subscriber_rate_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count integer;
BEGIN
  SELECT COUNT(*)
  INTO recent_count
  FROM blog_subscribers
  WHERE subscribed_at > now() - interval '60 seconds';

  IF recent_count >= 5 THEN
    RAISE EXCEPTION 'Too many subscription attempts. Please try again shortly.';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_subscriber_rate_limit ON blog_subscribers;

CREATE TRIGGER trg_subscriber_rate_limit
  BEFORE INSERT ON blog_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION check_subscriber_rate_limit();
