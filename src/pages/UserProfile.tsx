import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UserProfileData {
  id: string;
  username: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
}

interface UserStats {
  post_count: number;
  reply_count: number;
}

export default function UserProfile() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) return;

    const loadProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('username', username.toLowerCase())
          .maybeSingle();

        if (profileError && profileError.code !== 'PGRST116') throw profileError;

        if (!profileData) {
          setError('User not found');
          setProfile(null);
          setStats(null);
          return;
        }

        setProfile(profileData);

        const { data: postsData, error: postsError } = await supabase
          .from('forum_posts')
          .select('id', { count: 'exact' })
          .eq('user_id', profileData.id);

        const { data: repliesData, error: repliesError } = await supabase
          .from('forum_replies')
          .select('id', { count: 'exact' })
          .eq('user_id', profileData.id);

        if (!postsError && !repliesError) {
          setStats({
            post_count: postsData?.length || 0,
            reply_count: repliesData?.length || 0,
          });
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/community')}
            className="flex items-center text-teal-600 hover:text-teal-700 mb-8 font-semibold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Community
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {error || 'Profile Not Found'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error || 'The user profile you are looking for does not exist.'}
            </p>
            <button
              onClick={() => navigate('/community')}
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Return to Community
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/community')}
          className="flex items-center text-teal-600 hover:text-teal-700 mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Community
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.username}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl font-bold">
                  {profile.username[0].toUpperCase()}
                </span>
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                @{profile.username}
              </h1>

              {profile.display_name && (
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                  {profile.display_name}
                </p>
              )}

              {profile.bio && (
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {profile.bio}
                </p>
              )}

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Joined {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-2">
                <MessageCircle className="w-5 h-5 text-teal-600 mr-2" />
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Posts</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.post_count}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-2">
                <MessageCircle className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Replies</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.reply_count}
              </p>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Community Member
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This user is an active member of the Bespoke IELTS community. They have contributed valuable insights and helped other students achieve their goals.
          </p>
          <button
            onClick={() => navigate('/community')}
            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            View Their Posts
          </button>
        </div>
      </div>
    </div>
  );
}
