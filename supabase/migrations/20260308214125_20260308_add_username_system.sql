/*
  # Add Username System to Community

  1. New Tables
    - `user_profiles` - Extends auth.users with username and profile data
      - `id` (uuid, primary key, references auth.users.id)
      - `username` (text, unique, not null) - Primary community identifier
      - `display_name` (text, nullable) - Optional full name
      - `bio` (text, nullable) - User biography
      - `avatar_url` (text, nullable) - Profile picture URL
      - `username_change_count` (int, default 0) - Track changes for rate limiting
      - `username_changed_at` (timestamp, nullable) - Last change timestamp
      - `reserved_by_admin` (boolean, default false) - Admin-reserved flag
      - `created_at` (timestamp, default now())
      - `updated_at` (timestamp, default now())

    - `reserved_usernames` - Admin-reserved usernames
      - `username` (text, primary key) - Reserved username
      - `reserved_for` (text, not null) - Entity name (e.g., "BespokeIELTS")
      - `reason` (text, nullable) - Reason for reservation
      - `created_at` (timestamp, default now())

    - `username_history` - Audit trail for username changes
      - `id` (uuid, primary key)
      - `user_id` (uuid, not null, references user_profiles.id)
      - `old_username` (text, nullable) - Previous username
      - `new_username` (text, not null) - New username
      - `changed_at` (timestamp, default now())

  2. Schema Updates
    - Add `username` column to `forum_posts` for denormalized display
    - Add `username` column to `forum_replies` for denormalized display

  3. Security
    - Enable RLS on all new tables
    - Users can read all usernames (required for mentions/profiles)
    - Users can only update their own profile
    - Admins have full control over reserved usernames
    - Audit trail is append-only for integrity

  4. Indexes
    - Username lookup indexes for performance
    - User ID indexes for queries
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  display_name text,
  bio text,
  avatar_url text,
  username_change_count integer DEFAULT 0,
  username_changed_at timestamptz,
  reserved_by_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reserved_usernames table
CREATE TABLE IF NOT EXISTS reserved_usernames (
  username text PRIMARY KEY,
  reserved_for text NOT NULL,
  reason text,
  created_at timestamptz DEFAULT now()
);

-- Create username_history table
CREATE TABLE IF NOT EXISTS username_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  old_username text,
  new_username text NOT NULL,
  changed_at timestamptz DEFAULT now()
);

-- Add username columns to forum tables if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'forum_posts' AND column_name = 'username'
  ) THEN
    ALTER TABLE forum_posts ADD COLUMN username text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'forum_replies' AND column_name = 'username'
  ) THEN
    ALTER TABLE forum_replies ADD COLUMN username text;
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(LOWER(username));
CREATE INDEX IF NOT EXISTS idx_username_history_user_id ON username_history(user_id);
CREATE INDEX IF NOT EXISTS idx_username_history_changed_at ON username_history(changed_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_posts_username ON forum_posts(username);
CREATE INDEX IF NOT EXISTS idx_forum_replies_username ON forum_replies(username);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reserved_usernames ENABLE ROW LEVEL SECURITY;
ALTER TABLE username_history ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can read all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can manage profiles" ON user_profiles;
DROP POLICY IF EXISTS "Anyone can read reserved usernames" ON reserved_usernames;
DROP POLICY IF EXISTS "Admins can manage reserved usernames" ON reserved_usernames;
DROP POLICY IF EXISTS "Users can read own history" ON username_history;
DROP POLICY IF EXISTS "Admins can read all history" ON username_history;
DROP POLICY IF EXISTS "System can insert history" ON username_history;

-- RLS Policies for user_profiles
CREATE POLICY "Users can read all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can manage profiles"
  ON user_profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies for reserved_usernames
CREATE POLICY "Anyone can read reserved usernames"
  ON reserved_usernames FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage reserved usernames"
  ON reserved_usernames FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies for username_history
CREATE POLICY "Users can read own history"
  ON username_history FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can read all history"
  ON username_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "System can insert history"
  ON username_history FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());
