/*
  # Allow Public Audio Uploads
  
  1. Changes
    - Update storage policies to allow public (unauthenticated) uploads
    - Maintains public read access
    - Allows anyone to upload audio files to listening-audio bucket
    
  2. Security Notes
    - This is intended for admin/owner use during site setup
    - Consider restricting this after initial setup is complete
*/

-- Drop the authenticated-only upload policy
DROP POLICY IF EXISTS "Authenticated users can upload audio" ON storage.objects;

-- Create new policy allowing public uploads
CREATE POLICY "Public can upload audio files"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'listening-audio');

-- Drop and recreate update policy for public access
DROP POLICY IF EXISTS "Authenticated users can update audio" ON storage.objects;

CREATE POLICY "Public can update audio files"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'listening-audio')
WITH CHECK (bucket_id = 'listening-audio');

-- Drop and recreate delete policy for public access
DROP POLICY IF EXISTS "Authenticated users can delete audio" ON storage.objects;

CREATE POLICY "Public can delete audio files"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'listening-audio');
