/*
  # Add INSERT policy for user_profiles

  1. Security Changes
    - Add policy allowing authenticated users to create their own profile
    - Users can only insert a row where the id matches their auth.uid()
    
  2. Purpose
    - Fixes 403 Forbidden error during signup when creating user profile
    - Ensures new users can set their username during registration
*/

CREATE POLICY "Users can create own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);