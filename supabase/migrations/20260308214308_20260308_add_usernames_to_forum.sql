/*
  # Add Usernames to Forum Posts and Replies

  1. Updates
    - Recreate `get_forum_posts_with_stats` RPC to include username from user_profiles
    - Recreate `get_forum_replies_with_usernames` RPC for replies with usernames
    - Update forum_posts and forum_replies to populate username fields

  2. Data Migration
    - Backfill username field in forum_posts from user_profiles
    - Backfill username field in forum_replies from user_profiles
*/

-- Drop existing RPC function
DROP FUNCTION IF EXISTS get_forum_posts_with_stats(text, uuid);

-- Create updated RPC with username
CREATE OR REPLACE FUNCTION get_forum_posts_with_stats(
  p_category text DEFAULT NULL,
  p_user_id uuid DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  username text,
  category text,
  title text,
  content text,
  upvotes integer,
  is_pinned boolean,
  teacher_reply boolean,
  created_at timestamptz,
  updated_at timestamptz,
  reply_count bigint,
  user_voted integer
)
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    fp.id,
    fp.user_id,
    COALESCE(up.username, 'Unknown User') AS username,
    fp.category,
    fp.title,
    fp.content,
    fp.upvotes,
    fp.is_pinned,
    fp.teacher_reply,
    fp.created_at,
    fp.updated_at,
    COUNT(fr.id) AS reply_count,
    COALESCE(fv.vote_type, 0) AS user_voted
  FROM forum_posts fp
  LEFT JOIN user_profiles up ON up.id = fp.user_id
  LEFT JOIN forum_replies fr ON fr.post_id = fp.id
  LEFT JOIN forum_votes fv ON fv.post_id = fp.id AND fv.user_id = p_user_id
  WHERE (p_category IS NULL OR fp.category = p_category)
  GROUP BY fp.id, fp.user_id, up.username, fp.category, fp.title, fp.content,
           fp.upvotes, fp.is_pinned, fp.teacher_reply, fp.created_at,
           fp.updated_at, fv.vote_type
  ORDER BY fp.is_pinned DESC, fp.created_at DESC;
END;
$$;

-- Create new RPC for getting forum replies with usernames
CREATE OR REPLACE FUNCTION get_forum_replies_with_usernames(p_post_id uuid)
RETURNS TABLE (
  id uuid,
  post_id uuid,
  user_id uuid,
  username text,
  content text,
  teacher_reply boolean,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    fr.id,
    fr.post_id,
    fr.user_id,
    COALESCE(up.username, 'Unknown User') AS username,
    fr.content,
    fr.teacher_reply,
    fr.created_at,
    fr.updated_at
  FROM forum_replies fr
  LEFT JOIN user_profiles up ON up.id = fr.user_id
  WHERE fr.post_id = p_post_id
  ORDER BY fr.created_at ASC;
END;
$$;

-- Backfill username in forum_posts
UPDATE forum_posts fp
SET username = COALESCE(up.username, 'Unknown User')
FROM user_profiles up
WHERE fp.user_id = up.id AND fp.username IS NULL;

-- Backfill username in forum_replies
UPDATE forum_replies fr
SET username = COALESCE(up.username, 'Unknown User')
FROM user_profiles up
WHERE fr.user_id = up.id AND fr.username IS NULL;
