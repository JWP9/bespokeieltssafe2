/*
  # Create blog_reads tracking table

  1. New Tables
    - `blog_reads`
      - `id` (uuid, primary key) - Unique identifier for each read
      - `user_id` (uuid, nullable) - Reference to authenticated user (null for anonymous)
      - `post_id` (text) - Identifier for the blog post
      - `post_title` (text) - Title of the blog post
      - `created_at` (timestamptz) - Timestamp of the read
      
    - `blog_subscribers`
      - `id` (uuid, primary key) - Unique identifier
      - `email` (text, unique) - Subscriber email
      - `name` (text, nullable) - Subscriber name
      - `subscribed_at` (timestamptz) - Subscription timestamp
      - `is_active` (boolean) - Active subscription status

  2. Security
    - Enable RLS on both tables
    - Allow authenticated users to track their own reads
    - Allow anyone to add reads (for analytics)
    - Allow anyone to subscribe
    - Only allow users to view their own subscription data
*/

-- Create blog_reads table
CREATE TABLE IF NOT EXISTS blog_reads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  post_id text NOT NULL,
  post_title text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create blog_subscribers table
CREATE TABLE IF NOT EXISTS blog_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Enable RLS
ALTER TABLE blog_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_subscribers ENABLE ROW LEVEL SECURITY;

-- Policies for blog_reads
CREATE POLICY "Anyone can insert blog reads"
  ON blog_reads
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view own reads"
  ON blog_reads
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for blog_subscribers
CREATE POLICY "Anyone can subscribe"
  ON blog_subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view own subscription"
  ON blog_subscribers
  FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_reads_user_id ON blog_reads(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_reads_post_id ON blog_reads(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_reads_created_at ON blog_reads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_subscribers_email ON blog_subscribers(email);
