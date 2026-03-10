/*
  # Schedule Trial Expiry Reminder Cron Job

  ## Summary
  Uses pg_cron to run the trial-expiry-reminder Edge Function once per hour.
  This checks for any premium_trial users whose trial_end falls within the next
  23–25 hours (Day 6 window) and sends a reminder email if one hasn't been sent yet.

  ## Notes
  - Runs every hour at minute 0
  - The Edge Function itself is idempotent: reminder_sent_at prevents duplicate sends
  - Requires pg_cron and pg_net extensions (available in Supabase)
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_extension WHERE extname = 'pg_cron'
  ) THEN
    PERFORM cron.schedule(
      'trial-expiry-reminder-hourly',
      '0 * * * *',
      $cron$
        SELECT net.http_post(
          url := (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'supabase_url') || '/functions/v1/trial-expiry-reminder',
          headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'supabase_anon_key')
          ),
          body := '{}'::jsonb
        );
      $cron$
    );
  END IF;
END $$;
