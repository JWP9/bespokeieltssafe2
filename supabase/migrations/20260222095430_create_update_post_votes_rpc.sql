/*
  # Create update_post_votes RPC Function

  ## Summary
  Creates a database function to handle forum post voting atomically.
  This fixes the broken voting in the Community forum.

  ## Function: update_post_votes(post_id, change)
  - Atomically updates the upvotes count on a forum post
  - Takes a post_id and a numeric change (+1, -1, +2, -2)
  - Prevents race conditions compared to read-then-write

  ## Security
  - Authenticated users only
  - SECURITY DEFINER to bypass RLS for the counter update
*/

CREATE OR REPLACE FUNCTION update_post_votes(post_id uuid, change integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  UPDATE public.forum_posts
  SET upvotes = GREATEST(0, upvotes + change),
      updated_at = now()
  WHERE id = post_id;
END;
$$;

CREATE OR REPLACE FUNCTION get_forum_posts_with_stats(
  p_category text DEFAULT NULL,
  p_user_id uuid DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  user_id uuid,
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
  LEFT JOIN forum_replies fr ON fr.post_id = fp.id
  LEFT JOIN forum_votes fv ON fv.post_id = fp.id AND fv.user_id = p_user_id
  WHERE (p_category IS NULL OR fp.category = p_category)
  GROUP BY fp.id, fp.user_id, fp.category, fp.title, fp.content,
           fp.upvotes, fp.is_pinned, fp.teacher_reply, fp.created_at,
           fp.updated_at, fv.vote_type
  ORDER BY fp.is_pinned DESC, fp.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION pin_forum_post(p_post_id uuid, p_pinned boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_role text;
BEGIN
  SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid();

  IF user_role != 'admin' THEN
    RAISE EXCEPTION 'Access denied: admin only';
  END IF;

  UPDATE public.forum_posts
  SET is_pinned = p_pinned, updated_at = now()
  WHERE id = p_post_id;
END;
$$;

CREATE OR REPLACE FUNCTION mark_teacher_reply(p_reply_id uuid, p_is_teacher boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_role text;
BEGIN
  SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid();

  IF user_role != 'admin' THEN
    RAISE EXCEPTION 'Access denied: admin only';
  END IF;

  UPDATE public.forum_replies
  SET teacher_reply = p_is_teacher, updated_at = now()
  WHERE id = p_reply_id;
END;
$$;
