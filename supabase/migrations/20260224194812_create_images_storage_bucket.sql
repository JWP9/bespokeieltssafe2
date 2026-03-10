/*
  # Create Images Storage Bucket

  1. New Storage Bucket
    - `images` - dedicated bucket for image file uploads
      - Accepts `image/png` and `image/jpeg` MIME types
      - 10MB file size limit
      - Public access enabled

  2. Storage Policies
    - Public read access (via public bucket flag)
    - Public INSERT - anyone can upload images
    - Public UPDATE - anyone can overwrite existing images
    - Public DELETE - anyone can delete images

  3. Notes
    - Mirrors the permission model of the existing `listening-audio` bucket
    - Intended for admin use during site setup
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  10485760,
  ARRAY['image/png', 'image/jpeg']
)
ON CONFLICT (id) DO UPDATE SET
  allowed_mime_types = ARRAY['image/png', 'image/jpeg'],
  file_size_limit = 10485760,
  public = true;

CREATE POLICY "Public can upload images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Public can update images"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'images')
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Public can delete images"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'images');

CREATE POLICY "Public can view images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');
