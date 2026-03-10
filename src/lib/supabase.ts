import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const isSupabaseConfigured = !!(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Progress = {
  id: string;
  user_id: string;
  skill: 'Listening' | 'Reading' | 'Writing' | 'Speaking';
  score: number;
  test_type: string;
  notes?: string;
  date: string;
  created_at: string;
};
