import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface TopicSubmissionModalProps {
  onClose: () => void;
}

export default function TopicSubmissionModal({ onClose }: TopicSubmissionModalProps) {
  const { user } = useAuth();
  const [topic, setTopic] = useState('');
  const [questionsText, setQuestionsText] = useState('');
  const [answersText, setAnswersText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate
    const questions = questionsText
      .split('\n')
      .map(q => q.trim())
      .filter(q => q.length > 0);

    if (questions.length < 6) {
      setError('Please provide at least 6 questions (one per line)');
      return;
    }

    if (questions.length > 8) {
      setError('Maximum 8 questions allowed');
      return;
    }

    if (!topic.trim()) {
      setError('Please provide a topic name');
      return;
    }

    // Parse optional answers
    const answers = answersText
      .split('\n')
      .map(a => a.trim())
      .filter(a => a.length > 0);

    setIsSubmitting(true);

    try {
      if (!user) {
        // Guest mode - save to local storage
        const guestTopics = JSON.parse(localStorage.getItem('guestTopics') || '[]');
        guestTopics.push({
          id: Date.now().toString(),
          topic: topic.trim(),
          questions,
          answers: answers.length > 0 ? answers : null,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('guestTopics', JSON.stringify(guestTopics));
        setSubmitted(true);
      } else {
        // Authenticated - save to Supabase
        const { error: insertError } = await supabase
          .from('user_topics')
          .insert({
            user_id: user.id,
            topic: topic.trim(),
            questions: JSON.stringify(questions),
            answers: answers.length > 0 ? JSON.stringify(answers) : null,
            approved: false,
          });

        if (insertError) throw insertError;
        setSubmitted(true);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit topic');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Your topic suggestion has been submitted.
              {user ? ' Our team will review it soon.' : ' Sign in to track your submissions!'}
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">Suggest a New Topic</h3>
        <p className="text-gray-600 mb-6">
          Help expand our question bank by suggesting a new Part 3 topic
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic Name *
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Digital Privacy, Space Exploration"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Questions (6-8 required) *
            </label>
            <textarea
              value={questionsText}
              onChange={(e) => setQuestionsText(e.target.value)}
              placeholder="Enter one question per line:&#10;How has social media changed communication?&#10;What are the benefits of digital technology?&#10;Should governments regulate online content?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none font-mono text-sm"
              rows={8}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {questionsText.split('\n').filter(q => q.trim()).length} questions entered
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sample Answers (Optional)
            </label>
            <textarea
              value={answersText}
              onChange={(e) => setAnswersText(e.target.value)}
              placeholder="Enter one answer per line (optional)&#10;Must match the order of your questions above"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none font-mono text-sm"
              rows={6}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {!user && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
              <strong>Guest mode:</strong> Your submission will be saved locally. Sign in to track your submissions online.
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Topic'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
