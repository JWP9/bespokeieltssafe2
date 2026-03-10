import { useState, useEffect } from 'react';
import { PlayCircle, BookmarkPlus, TrendingUp, Calendar, Award, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Progress } from '../lib/supabase';

export default function Practice() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddScore, setShowAddScore] = useState(false);
  const [newScore, setNewScore] = useState({
    skill: 'Listening' as 'Listening' | 'Reading' | 'Writing' | 'Speaking',
    score: '',
    test_type: 'Mock Test',
    notes: '',
  });

  useEffect(() => {
    if (user) {
      fetchProgress();

      const subscription = supabase
        .channel('progress_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'progress',
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            fetchProgress();
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchProgress = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .order('date', { ascending: false });

    if (!error && data) {
      setProgress(data);
    }
    setLoading(false);
  };

  const handleAddScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from('progress').insert({
      user_id: user.id,
      skill: newScore.skill,
      score: parseFloat(newScore.score),
      test_type: newScore.test_type,
      notes: newScore.notes || null,
    });

    if (!error) {
      fetchProgress();
      setShowAddScore(false);
      setNewScore({
        skill: 'Listening',
        score: '',
        test_type: 'Mock Test',
        notes: '',
      });
    }
  };

  const getLatestScores = () => {
    const skills = ['Listening', 'Reading', 'Writing', 'Speaking'];
    return skills.map((skill) => {
      const skillProgress = progress.filter((p) => p.skill === skill);
      const latest = skillProgress[0];
      return { skill, score: latest?.score || null, date: latest?.date };
    });
  };

  const getAverageScore = () => {
    const latestScores = getLatestScores();
    const scores = latestScores.filter((s) => s.score !== null).map((s) => s.score as number);
    if (scores.length === 0) return null;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(avg * 2) / 2;
  };

  const mockTests = [
    {
      title: 'Full Mock Test 1',
      duration: '2 hours 45 minutes',
      description: 'Complete IELTS Academic practice test with all four sections',
      difficulty: 'Intermediate',
    },
    {
      title: 'Full Mock Test 2',
      duration: '2 hours 45 minutes',
      description: 'Advanced level practice test with challenging passages',
      difficulty: 'Advanced',
    },
    {
      title: 'Listening Practice Set',
      duration: '30 minutes',
      description: 'Focused listening practice with various accents',
      difficulty: 'All Levels',
    },
    {
      title: 'Reading Speed Test',
      duration: '60 minutes',
      description: 'Improve your reading speed and comprehension',
      difficulty: 'All Levels',
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Practice Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access mock tests, track your progress, and improve your IELTS skills
          </p>
        </div>

        {user && (
          <div className="mb-12">
            <div className="bg-gradient-to-br from-teal-600 to-blue-600 text-white rounded-2xl p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Your Progress Dashboard</h2>
                  <p className="text-blue-100">Track your IELTS preparation journey</p>
                </div>
                <button
                  onClick={() => setShowAddScore(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-teal-600 rounded-lg hover:shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Score</span>
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                </div>
              ) : (
                <>
                  {getAverageScore() !== null && (
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Award className="w-8 h-8" />
                          <div>
                            <p className="text-sm text-blue-100">Current Average Band Score</p>
                            <p className="text-4xl font-bold">{getAverageScore()?.toFixed(1)}</p>
                          </div>
                        </div>
                        <TrendingUp className="w-12 h-12 text-blue-200" />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {getLatestScores().map((item) => (
                      <div key={item.skill} className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-sm text-blue-100 mb-1">{item.skill}</p>
                        {item.score !== null ? (
                          <>
                            <p className="text-3xl font-bold mb-1">Band {item.score}</p>
                            <p className="text-xs text-blue-200">
                              {new Date(item.date!).toLocaleDateString()}
                            </p>
                          </>
                        ) : (
                          <p className="text-lg text-blue-200">No scores yet</p>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {progress.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-teal-600" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {progress.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">{item.skill}</p>
                        <p className="text-sm text-gray-600">
                          {item.test_type} • {new Date(item.date).toLocaleDateString()}
                        </p>
                        {item.notes && <p className="text-sm text-gray-500 mt-1">{item.notes}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-teal-600">Band {item.score}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!user && (
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 mb-12 text-center">
            <BookmarkPlus className="w-16 h-16 text-teal-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Track Your Progress</h3>
            <p className="text-gray-600 mb-6">
              Sign in to save your practice scores and monitor your improvement over time
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Sign In to Get Started
            </button>
          </div>
        )}

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Mock Tests & Practice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTests.map((test, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
                    {test.title}
                  </h3>
                  <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                    {test.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{test.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{test.duration}</span>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    <PlayCircle className="w-5 h-5" />
                    <span>Start Test</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Vocabulary Flashcards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Academic Vocabulary</h3>
              <p className="text-gray-600 text-sm mb-3">500 essential academic words</p>
              <button className="text-teal-600 font-medium text-sm hover:text-teal-700">
                Practice Now →
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Topic Vocabulary</h3>
              <p className="text-gray-600 text-sm mb-3">Words organized by common topics</p>
              <button className="text-teal-600 font-medium text-sm hover:text-teal-700">
                Practice Now →
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Collocations</h3>
              <p className="text-gray-600 text-sm mb-3">Common word combinations</p>
              <button className="text-teal-600 font-medium text-sm hover:text-teal-700">
                Practice Now →
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddScore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add Practice Score</h3>
            <form onSubmit={handleAddScore} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skill</label>
                <select
                  value={newScore.skill}
                  onChange={(e) => setNewScore({ ...newScore, skill: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                >
                  <option value="Listening">Listening</option>
                  <option value="Reading">Reading</option>
                  <option value="Writing">Writing</option>
                  <option value="Speaking">Speaking</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Score (0-9)</label>
                <input
                  type="number"
                  min="0"
                  max="9"
                  step="0.5"
                  value={newScore.score}
                  onChange={(e) => setNewScore({ ...newScore, score: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
                <input
                  type="text"
                  value={newScore.test_type}
                  onChange={(e) => setNewScore({ ...newScore, test_type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="e.g., Mock Test, Practice Exercise"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  value={newScore.notes}
                  onChange={(e) => setNewScore({ ...newScore, notes: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  rows={3}
                  placeholder="Add any notes about this practice session"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Add Score
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddScore(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
