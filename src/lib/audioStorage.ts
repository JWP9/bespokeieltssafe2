const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const STORAGE_BUCKET = 'listening-audio';

export function getAudioUrl(filename: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${filename}`;
}

export const AUDIO_FILES = {
  HOTEL_CALL: 'ielts_hotel_call_mixdown_1.mp3',
  TOUR_GUIDE: 'IELTS_Tour_Guide.mp3',
} as const;
