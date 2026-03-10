import { Sparkles, X, AlertCircle, Loader2 } from 'lucide-react';

interface BespokeIELTSFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  error: string | null;
  feedback: {
    strengths: string[];
    areas_to_improve?: string[];
    weaknesses?: string[];
    bespoke_tip: string;
    overall_tip?: string;
  } | null;
  taskType: 'task1' | 'task2';
  onRetry: () => void;
}


export default function BespokeIELTSFeedback({
  isOpen,
  onClose,
  isLoading,
  error,
  feedback,
  taskType,
  onRetry,
}: BespokeIELTSFeedbackProps) {
  if (!isOpen) return null;

  const taskLabel = taskType === 'task1' ? 'Task 1' : 'Task 2';

  return (
    <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#1E3A8A] rounded-2xl max-w-3xl w-full p-8 my-8 shadow-2xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-teal-400" />
              Bespoke IELTS AI Feedback — {taskLabel}
            </h3>
            <p className="text-white/60 text-sm mt-1">Expert analysis to help you improve</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 className="w-12 h-12 text-teal-400 animate-spin" />
            <p className="text-white font-medium">Analyzing your {taskLabel} response...</p>
            <p className="text-white/50 text-sm">Our expert examiner is evaluating your work</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <AlertCircle className="w-12 h-12 text-red-400" />
            <p className="text-white font-medium text-center">{error}</p>
            <button
              onClick={onRetry}
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && feedback && (
          <>
            {/* Strengths */}
            {feedback.strengths && feedback.strengths.length > 0 && (
              <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                <h4 className="text-green-400 font-semibold text-sm uppercase tracking-wide mb-3">
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {feedback.strengths.map((strength, i) => (
                    <li key={i} className="text-white/90 text-sm flex items-start gap-3">
                      <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">+</span>
                      <span className="leading-relaxed">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Areas to Improve */}
            {(feedback.areas_to_improve || feedback.weaknesses) &&
              (feedback.areas_to_improve || feedback.weaknesses)!.length > 0 && (
                <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-5">
                  <h4 className="text-red-400 font-semibold text-sm uppercase tracking-wide mb-3">
                    Areas to Improve
                  </h4>
                  <ul className="space-y-2">
                    {(feedback.areas_to_improve || feedback.weaknesses)!.map((area, i) => (
                      <li key={i} className="text-white/90 text-sm flex items-start gap-3">
                        <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">•</span>
                        <span className="leading-relaxed">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Bespoke Tip */}
            <div className="mb-6 bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
              <h4 className="text-amber-400 font-semibold text-sm uppercase tracking-wide mb-3">
                Bespoke IELTS Tip
              </h4>
              <p className="text-white/90 text-sm leading-relaxed">{feedback.bespoke_tip || feedback.overall_tip}</p>
            </div>
          </>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-gradient-to-r from-teal-600 to-[#0D9488] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Close Feedback
        </button>
      </div>
    </div>
  );
}
