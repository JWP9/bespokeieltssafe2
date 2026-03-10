import { useState, useEffect } from 'react';
import { Lock, Search, FileText, Eye, X, LogIn } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface ModelAnswer {
  id: number;
  prompt_id: number;
  chart_type: string;
  model_answer: string;
  word_count: number;
}

export default function AdminAnswers() {
  const { user, isAdmin, loading } = useAuth();
  const [answers, setAnswers] = useState<ModelAnswer[]>([]);
  const [filteredAnswers, setFilteredAnswers] = useState<ModelAnswer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<ModelAnswer | null>(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredAnswers(answers);
    } else {
      const filtered = answers.filter(
        a =>
          a.prompt_id.toString().includes(searchTerm) ||
          a.chart_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.model_answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAnswers(filtered);
    }
  }, [searchTerm, answers]);

  useEffect(() => {
    if (isAdmin) {
      fetchAnswers();
    }
  }, [isAdmin]);

  const fetchAnswers = async () => {
    setFetchLoading(true);
    try {
      const { data, error } = await supabase
        .from('admin_task1_answers')
        .select('*')
        .order('prompt_id', { ascending: true });

      if (error) throw error;
      setAnswers(data || []);
      setFilteredAnswers(data || []);
    } catch (err) {
      console.error('Error fetching answers:', err);
    } finally {
      setFetchLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1E3A8A] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#1E3A8A] flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
              <LogIn className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Login Required
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please sign in to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#1E3A8A] flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            This page is restricted to admin users only.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E3A8A] pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Model Answers Dashboard</h1>
            <p className="text-white/70">Band 9 Task 1 Responses - Private Admin Section</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-sm">{user.email}</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by prompt ID, chart type, or keywords..."
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <p className="text-white/60 text-sm mt-2">
            {filteredAnswers.length} of {answers.length} answers shown
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-teal-600 rounded-lg p-4">
            <p className="text-white/80 text-sm">Total Answers</p>
            <p className="text-white text-3xl font-bold">{answers.length}</p>
          </div>
          <div className="bg-blue-600 rounded-lg p-4">
            <p className="text-white/80 text-sm">Bar Charts</p>
            <p className="text-white text-3xl font-bold">
              {answers.filter(a => a.chart_type === 'bar').length}
            </p>
          </div>
          <div className="bg-cyan-600 rounded-lg p-4">
            <p className="text-white/80 text-sm">Line Charts</p>
            <p className="text-white text-3xl font-bold">
              {answers.filter(a => a.chart_type === 'line').length}
            </p>
          </div>
          <div className="bg-red-600 rounded-lg p-4">
            <p className="text-white/80 text-sm">Pie Charts</p>
            <p className="text-white text-3xl font-bold">
              {answers.filter(a => a.chart_type === 'pie').length}
            </p>
          </div>
        </div>

        {fetchLoading ? (
          <div className="text-center text-white py-12">
            <div className="w-10 h-10 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading answers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAnswers.map((answer) => (
              <div
                key={answer.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => setSelectedAnswer(answer)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="inline-block px-3 py-1 bg-teal-600 text-white text-xs font-semibold rounded-full mb-2">
                      Prompt #{answer.prompt_id}
                    </span>
                    <h3 className="text-white font-semibold capitalize">
                      {answer.chart_type} Chart
                    </h3>
                  </div>
                  <Eye className="w-5 h-5 text-white/60" />
                </div>
                <p className="text-white/70 text-sm line-clamp-3 mb-3">
                  {answer.model_answer}
                </p>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>{answer.word_count} words</span>
                  <span className="flex items-center">
                    <FileText className="w-3 h-3 mr-1" />
                    Band 9
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredAnswers.length === 0 && !fetchLoading && (
          <div className="text-center text-white/60 py-12">
            <p>No answers found matching your search.</p>
          </div>
        )}
      </div>

      {selectedAnswer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full p-8 my-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="inline-block px-3 py-1 bg-teal-600 text-white text-xs font-semibold rounded-full mb-2">
                  Prompt #{selectedAnswer.prompt_id}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                  {selectedAnswer.chart_type} Chart - Band 9 Model Answer
                </h2>
              </div>
              <button
                onClick={() => setSelectedAnswer(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-4">
              <p className="text-gray-900 dark:text-white leading-relaxed whitespace-pre-line">
                {selectedAnswer.model_answer}
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Word count: {selectedAnswer.word_count}</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full font-semibold">
                Band 9 Standard
              </span>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Band 9 Features:</strong> Complex sentence structures, precise academic vocabulary,
                clear overview with trends, comprehensive coverage of key features, error-free grammar.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
