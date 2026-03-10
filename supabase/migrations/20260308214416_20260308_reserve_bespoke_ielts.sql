/*
  # Reserve BespokeIELTS Username

  1. Inserts the "BespokeIELTS" username into the reserved_usernames table
     - Reserved for: Bespoke IELTS Admin
     - Reason: Official brand account

  2. This prevents any user from registering with this username
     - The username is blocked during signup validation
     - It's reserved for official administrative use
*/

INSERT INTO reserved_usernames (username, reserved_for, reason)
VALUES (
  'bespoke-ielts',
  'Bespoke IELTS Admin',
  'Official brand account'
)
ON CONFLICT (username) DO NOTHING;
