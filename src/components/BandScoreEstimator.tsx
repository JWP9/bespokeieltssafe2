import { useState } from 'react';
import { X, Sparkles, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface BandScoreEstimatorProps {
  audioBlob: Blob;
  topic: string;
  part: number;
  onClose: () => void;
}

interface BandScore {
  band: number;
  breakdown: {
    fluency: number;
    vocabulary: number;
    grammar: number;
    pronunciation: number;
  };
  tips: string[];
}

export default function BandScoreEstimator({
  audioBlob,
  topic,
  part,
  onClose,
}: BandScoreEstimatorProps) {
  const { user } = useAuth();
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [bandScore, setBandScore] = useState<BandScore | null>(null);
  const [error, setError] = useState('');

  const handleEstimate = async () => {
    setError('');
    setIsTranscribing(true);

    try {
      // Step 1: Transcribe audio using Web Speech API (mock for now)
      const transcriptText = await transcribeAudio(audioBlob);
      setTranscript(transcriptText);
      setIsTranscribing(false);

      // Step 2: Calculate metrics
      const words = transcriptText.split(/\s+/).filter(w => w.length > 0);
      const wordsPerMinute = Math.round((words.length / 2) * 60); // Assuming ~2 min audio
      const pauseCount = transcriptText.split(/[.!?]+/).length;

      setIsScoring(true);

      // Step 3: Call Edge Function for AI scoring
      const score = await getAIBandScore(transcriptText, wordsPerMinute, pauseCount);
      setBandScore(score);

      // Step 4: Save to database
      if (user) {
        await saveBandScore(transcriptText, score, wordsPerMinute, pauseCount);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to estimate band score');
    } finally {
      setIsTranscribing(false);
      setIsScoring(false);
    }
  };

  const transcribeAudio = async (_blob: Blob): Promise<string> => {
    // Mock transcription for now
    // In production, use Web Speech API or Whisper API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          "I believe technology has fundamentally transformed the way we communicate and interact with one another. While some argue that digital communication reduces face-to-face interactions, I think it has actually expanded our ability to maintain relationships across distances. Social media platforms enable us to stay connected with friends and family members who live in different cities or even countries, which would have been impossible decades ago. However, we must acknowledge that excessive screen time can negatively impact our mental health and interpersonal skills. Therefore, I believe finding a healthy balance between online and offline communication is essential for maintaining meaningful relationships in the modern world."
        );
      }, 2000);
    });
  };

  const getAIBandScore = async (
    transcript: string,
    wpm: number,
    _pauses: number
  ): Promise<BandScore> => {
    // Mock AI response for now
    // In production, call Supabase Edge Function
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple mock scoring logic
        const wordCount = transcript.split(/\s+/).length;
        const complexity = transcript.split(',').length / wordCount;
        const baseBand = wordCount > 100 ? 7.5 : 6.5;
        const fluencyAdjustment = wpm > 140 && wpm < 180 ? 0.5 : 0;

        resolve({
          band: baseBand + fluencyAdjustment,
          breakdown: {
            fluency: 7.5 + (wpm > 150 ? 0.5 : 0),
            vocabulary: 7.0 + (complexity > 0.05 ? 0.5 : 0),
            grammar: 7.0,
            pronunciation: 7.5,
          },
          tips: [
            'Vary your sentence length more to improve fluency',
            'Use more advanced vocabulary and idiomatic expressions',
            'Practice reducing filler words like "um" and "uh"',
            'Work on pronunciation of complex words',
          ],
        });
      }, 3000);
    });
  };

  const saveBandScore = async (
    transcript: string,
    score: BandScore,
    wpm: number,
    pauses: number
  ) => {
    if (!user) return;

    const { error } = await supabase.from('speaking_scores').insert({
      user_id: user.id,
      part,
      topic,
      transcript,
      band_score: score.band,
      fluency_score: score.breakdown.fluency,
      vocabulary_score: score.breakdown.vocabulary,
      grammar_score: score.breakdown.grammar,
      pronunciation_score: score.breakdown.pronunciation,
      tips: score.tips.join('\n'),
      words_per_minute: wpm,
      pause_count: pauses,
    });

    if (error) {
      console.error('Error saving band score:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">AI Band Score Estimator</h3>
          <p className="text-gray-600">Get instant feedback on your speaking performance</p>
        </div>

        {!transcript && !bandScore && (
          <div className="text-center py-8">
            <button
              onClick={handleEstimate}
              disabled={isTranscribing}
              className="px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTranscribing ? (
                <span className="flex items-center space-x-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Transcribing Audio...</span>
                </span>
              ) : (
                'Start Analysis'
              )}
            </button>
          </div>
        )}

        {transcript && !bandScore && isScoring && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing your response...</p>
          </div>
        )}

        {bandScore && (
          <div className="space-y-6">
            {/* Band Score Badge */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-2xl animate-pulse">
                  <div>
                    <div className="text-white text-5xl font-bold">{bandScore.band}</div>
                    <div className="text-white text-sm text-center">BAND</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-4">Score Breakdown</h4>
              <div className="space-y-3">
                {Object.entries(bandScore.breakdown).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                      <span className="text-sm font-bold text-teal-600">{value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-teal-600 to-blue-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(value / 9) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3">Improvement Tips</h4>
              <ul className="space-y-2">
                {bandScore.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span className="text-sm text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Transcript */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3">Transcript</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{transcript}</p>
            </div>

            {user && (
              <p className="text-center text-xs text-gray-500">
                Your score has been saved to your progress dashboard
              </p>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
