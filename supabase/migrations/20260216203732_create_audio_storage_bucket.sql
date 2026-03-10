/*
  # Create Audio Storage Bucket for IELTS Listening Tests

  1. Storage Setup
    - Create public bucket named 'listening-audio'
    - Enable public access for audio files
    - Set up storage policies for read access
    
  2. Security
    - Public read access (anyone can listen to audio files)
    - Authenticated users can upload (for admin purposes)
    - File size limits and type restrictions
    
  3. Usage
    - Store MP3 audio files for listening tests
    - Access via: ${SUPABASE_URL}/storage/v1/object/public/listening-audio/{filename}
*/

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'listening-audio',
  'listening-audio',
  true,
  52428800, -- 50MB limit
  ARRAY['audio/mpeg', 'audio/mp3']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to audio files
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public read access for audio files'
  ) THEN
    CREATE POLICY "Public read access for audio files"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'listening-audio');
  END IF;
END $$;

-- Allow authenticated users to upload audio files
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can upload audio'
  ) THEN
    CREATE POLICY "Authenticated users can upload audio"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'listening-audio');
  END IF;
END $$;

-- Allow authenticated users to update audio files
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can update audio'
  ) THEN
    CREATE POLICY "Authenticated users can update audio"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'listening-audio')
    WITH CHECK (bucket_id = 'listening-audio');
  END IF;
END $$;

-- Allow authenticated users to delete audio files
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can delete audio'
  ) THEN
    CREATE POLICY "Authenticated users can delete audio"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'listening-audio');
  END IF;
END $$;