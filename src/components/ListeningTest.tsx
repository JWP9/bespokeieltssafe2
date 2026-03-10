import { useState, useRef, useEffect } from 'react';
import { Clock, CheckCircle2, RefreshCw, Sparkles, Loader2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { getAudioUrl } from '../lib/audioStorage';

interface ListeningTestProps {
  testId: number;
  testType: 'academic' | 'general';
}

interface SectionFeedback {
  raw_score: number;
  estimated_band: number;
  wrong_answers: { question: number; explanation: string; correct: string; suggestion: string }[];
  overall_tip: string;
}

const correctAnswers = [
  ['james carter'],
  ['14th 18th'],
  ['4'],
  ['executive'],
  ['flexible'],
  ['07700 900 457'],
  ['j.carter1985@outlook.com'],
  ['yes'],
  ['kx19 zyf'],
  ['11'],
  ['2022', 'twenty twenty-two'],
  ['1.2 million', 'one point two million'],
  ['24 hours', 'twenty-four hours'],
  ['25-metre', 'twenty-five metre', '25 metre'],
  ['free'],
  ['wednesday'],
  ['mental health'],
  ['top'],
  ['second'],
  ['accommodation'],
  ['sustainable'],
  ['ninety-two', '92', 'ninety two'],
  ['people tree'],
  ['financial'],
  ['sixty-seven', '67', 'sixty seven'],
  ['year two', 'year 2'],
  ['fifth', '5th'],
  ['thursday'],
  ['library'],
  ['marketing'],
  ['stacked'],
  ['twenty ten', '2010'],
  ['hydroponics'],
  ['aeroponics'],
  ['twelve', '12'],
  ['three hundred and ninety', '390'],
  ['seventy', '70'],
  ['waste heat'],
  ['twenty-four', '24'],
  ['scarce']
];

const bandScoreConversion: { [key: number]: number } = {
  40: 9.0, 39: 9.0, 38: 8.5, 37: 8.5, 36: 8.0, 35: 8.0,
  34: 7.5, 33: 7.5, 32: 7.0, 31: 7.0, 30: 7.0,
  29: 6.5, 28: 6.5, 27: 6.5, 26: 6.5,
  25: 6.0, 24: 6.0, 23: 6.0,
  22: 5.5, 21: 5.5, 20: 5.5, 19: 5.5, 18: 5.5,
  17: 5.0, 16: 5.0, 15: 4.5, 14: 4.5, 13: 4.0, 12: 4.0,
  11: 3.5, 10: 3.5, 9: 3.0, 8: 3.0, 7: 2.5, 6: 2.5,
  5: 2.0, 4: 2.0, 3: 1.5, 2: 1.5, 1: 1.0, 0: 0
};

const SECTION_CONFIGS = [
  {
    title: 'Section 1: Hotel Booking',
    audioLabel: 'Section 1 Audio: Hotel Booking',
    audioSrc: '/ielts_hotel_call_mixdown_1.mp3',
    instruction: 'Complete the form below. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.',
    context: 'A phone conversation between a guest and a hotel receptionist about making a room booking.',
    questions: [
      "1. The guest's name is ________.",
      "2. The stay is from the ________ to the ________ of May.",
      "3. Number of nights: ________.",
      "4. Room type: ________.",
      "5. Rate chosen: ________.",
      "6. Contact number: ________.",
      "7. Email: ________.",
      "8. Parking needed: ________.",
      "9. Car registration: ________.",
      "10. Check-out time: ________ a.m."
    ],
    offset: 0
  },
  {
    title: 'Section 2: University Campus Tour',
    audioLabel: 'Section 2 Audio: University Campus Tour (Michael)',
    audioSrc: '/IELTS_Tour_Guide.mp3',
    instruction: 'You will hear a university tour guide named Michael giving information about Riverside University. Answer questions 11–20. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.',
    context: 'A monologue by a university tour guide named Michael describing facilities at Riverside University.',
    questions: [
      "11. The Main Library was renovated in ________.",
      "12. It now holds over ________ books.",
      "13. The café on the ground floor is open ________ during exam periods.",
      "14. The Sports Centre includes a ________ swimming pool.",
      "15. Membership at the Sports Centre is ________ for students.",
      "16. The cinema in the Students' Union shows free films every ________.",
      "17. The advice centre helps with visa problems and ________ support.",
      "18. The Environmental Research Lab is on the ________ floor of the Science Faculty.",
      "19. Students can volunteer at the lab from ________ year onwards.",
      "20. The tour will next go to the ________ blocks."
    ],
    offset: 10
  },
  {
    title: 'Section 3: Marketing Project Discussion',
    audioLabel: 'Section 3 Audio: Cafe Discussion',
    audioSrc: getAudioUrl('section3-cafe-discussion.mp3'),
    instruction: 'You will hear two students, Anna and Tom, discussing a group project for their marketing class. Answer questions 21–30. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.',
    context: 'A conversation between two students, Anna and Tom, discussing their marketing class group project on sustainable fashion.',
    questions: [
      "21. The chosen topic is ________ fashion.",
      "22. A report says ________ million tonnes of textile waste is produced yearly.",
      "23. Dr Patel suggested comparing H&M's programme with ________.",
      "24. Tom will look at the ________ side.",
      "25. A survey shows ________% of 18–24-year-olds would pay more for sustainable clothes.",
      "26. The video interview is with Maya Singh from ________.",
      "27. The deadline is the ________ of May.",
      "28. They will meet next ________ at 2 p.m.",
      "29. The meeting place is the ________ café.",
      "30. The project is for the ________ class."
    ],
    offset: 20
  },
  {
    title: 'Section 4: Vertical Farming Lecture',
    audioLabel: 'Section 4 Audio: Lecture on Vertical Farming',
    audioSrc: 'https://pklpbnunurxsbqpglrwb.supabase.co/storage/v1/object/public/listening-audio/Verticalfarming.mp3',
    instruction: 'You will hear a lecture about vertical farming. Answer questions 31–40. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.',
    context: 'An academic lecture about vertical farming, covering its history, technology, benefits, and challenges.',
    questions: [
      "31. Vertical farming involves growing crops in ________ layers.",
      "32. The concept was popularised in ________ by Dr Dickson Despommier.",
      "33. Early experiments used ________.",
      "34. Modern systems use ________, which saves up to 95% water.",
      "35. AeroFarms grows leafy greens in a ________-metre-high warehouse.",
      "36. Their yields are up to ________ times higher per square metre.",
      "37. Energy consumption can account for up to ________ percent of costs.",
      "38. Some farms capture ________ from nearby buildings.",
      "39. AI robots monitor plants ________ hours a day.",
      "40. Vertical farming offers a solution where land is ________."
    ],
    offset: 30
  }
];

export default function ListeningTest({ testId, testType }: ListeningTestProps) {
  const { darkMode } = useDarkMode();
  const { user } = useAuth();

  const [answers, setAnswers] = useState<string[]>(Array(40).fill(''));
  const [hasStarted, setHasStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [sectionSubmitted, setSectionSubmitted] = useState<boolean[]>([false, false, false, false]);
  const [sectionScores, setSectionScores] = useState<number[]>([0, 0, 0, 0]);
  const [sectionErrors, setSectionErrors] = useState<number[][]>([[], [], [], []]);

  const [sectionFeedback, setSectionFeedback] = useState<(SectionFeedback | null)[]>([null, null, null, null]);
  const [sectionFeedbackLoading, setSectionFeedbackLoading] = useState<boolean[]>([false, false, false, false]);
  const [sectionFeedbackError, setSectionFeedbackError] = useState<(string | null)[]>([null, null, null, null]);
  const [sectionFeedbackOpen, setSectionFeedbackOpen] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const normalizeAnswer = (answer: string): string => {
    return answer.toLowerCase().trim().replace(/\s+/g, ' ');
  };

  const allSectionsSubmitted = sectionSubmitted.every(Boolean);

  const totalScore = sectionScores.reduce((sum, s) => sum + s, 0);
  const totalBand = allSectionsSubmitted ? (bandScoreConversion[totalScore] ?? 0) : null;
  const submittedCount = sectionSubmitted.filter(Boolean).length;

  const handleSectionSubmit = async (sectionIndex: number) => {
    const cfg = SECTION_CONFIGS[sectionIndex];
    const offset = cfg.offset;
    const errorIndices: number[] = [];
    let correctCount = 0;

    for (let i = 0; i < 10; i++) {
      const answerIndex = offset + i;
      const normalized = normalizeAnswer(answers[answerIndex]);
      const accepted = correctAnswers[answerIndex];
      if (accepted.some(a => normalizeAnswer(a) === normalized)) {
        correctCount++;
      } else {
        errorIndices.push(answerIndex);
      }
    }

    const newSubmitted = [...sectionSubmitted];
    newSubmitted[sectionIndex] = true;
    setSectionSubmitted(newSubmitted);

    const newScores = [...sectionScores];
    newScores[sectionIndex] = correctCount;
    setSectionScores(newScores);

    const newErrors = [...sectionErrors];
    newErrors[sectionIndex] = errorIndices;
    setSectionErrors(newErrors);

    const newFeedback = [...sectionFeedback];
    newFeedback[sectionIndex] = null;
    setSectionFeedback(newFeedback);

    const newFeedbackOpen = [...sectionFeedbackOpen];
    newFeedbackOpen[sectionIndex] = false;
    setSectionFeedbackOpen(newFeedbackOpen);

    const allSubmitted = newSubmitted.every(Boolean);
    if (allSubmitted && user) {
      const totalRaw = newScores.reduce((sum, s) => sum + s, 0);
      const totalBandFinal = bandScoreConversion[totalRaw] ?? 0;
      try {
        await supabase.from('listening_progress').upsert({
          user_id: user.id,
          test_id: testId,
          test_type: testType,
          raw_score: totalRaw,
          band: totalBandFinal,
          answers: answers.reduce((acc, ans, idx) => ({ ...acc, [`q${idx + 1}`]: ans }), {}),
          errors: newErrors.flat(),
          ai_feedback: {},
          time_taken: timeElapsed
        }, { onConflict: 'user_id,test_id' });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  };

  const fetchSectionFeedback = async (sectionIndex: number) => {
    const cfg = SECTION_CONFIGS[sectionIndex];
    const offset = cfg.offset;

    const newLoading = [...sectionFeedbackLoading];
    newLoading[sectionIndex] = true;
    setSectionFeedbackLoading(newLoading);

    const newError = [...sectionFeedbackError];
    newError[sectionIndex] = null;
    setSectionFeedbackError(newError);

    const newOpen = [...sectionFeedbackOpen];
    newOpen[sectionIndex] = true;
    setSectionFeedbackOpen(newOpen);

    try {
      if (!user) {
        throw new Error('Please sign in to access AI feedback');
      }

      const sectionCorrect: Record<number, string> = {};
      const sectionUser: Record<number, string> = {};
      for (let i = 0; i < 10; i++) {
        const qi = offset + i;
        sectionCorrect[qi + 1] = correctAnswers[qi][0];
        sectionUser[qi + 1] = answers[qi] || 'No answer';
      }

      const { data, error } = await supabase.functions.invoke('get-ai-feedback', {
        body: {
          skill: 'listening_section',
          sectionTitle: cfg.context,
          correctAnswers: sectionCorrect,
          userAnswers: sectionUser,
        },
      });

      if (error) {
        throw new Error(error.message || 'AI feedback request failed');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      const fb: SectionFeedback = data.feedback;
      const newFeedback = [...sectionFeedback];
      newFeedback[sectionIndex] = fb;
      setSectionFeedback(newFeedback);
    } catch (err: unknown) {
      const newErr = [...sectionFeedbackError];
      const rawScore = sectionScores[sectionIndex];
      const errorMsg = err instanceof Error ? err.message : 'Failed to get AI feedback';
      newErr[sectionIndex] = `${errorMsg} — Raw score: ${rawScore}/10`;
      setSectionFeedbackError(newErr);
    } finally {
      const newLoad = [...sectionFeedbackLoading];
      newLoad[sectionIndex] = false;
      setSectionFeedbackLoading(newLoad);
    }
  };

  const toggleFeedback = (sectionIndex: number) => {
    const isOpen = sectionFeedbackOpen[sectionIndex];
    if (!isOpen && !sectionFeedback[sectionIndex] && !sectionFeedbackLoading[sectionIndex]) {
      fetchSectionFeedback(sectionIndex);
    } else {
      const newOpen = [...sectionFeedbackOpen];
      newOpen[sectionIndex] = !isOpen;
      setSectionFeedbackOpen(newOpen);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Test 1: Complete Practice Test
          </h2>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            All 4 Sections • Questions 1–40
          </p>
        </div>
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <Clock className={`w-5 h-5 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
          <span className={`text-lg font-mono font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {formatTime(timeElapsed)}
          </span>
        </div>
      </div>

      {/* Section progress bar */}
      <div className={`flex items-center gap-2 mb-8 p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
        {SECTION_CONFIGS.map((cfg, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className={`w-full h-2 rounded-full transition-all ${
              sectionSubmitted[i]
                ? 'bg-teal-500'
                : 'bg-gray-300 dark:bg-gray-600'
            }`} />
            <span className={`text-xs font-medium ${
              sectionSubmitted[i]
                ? darkMode ? 'text-teal-400' : 'text-teal-600'
                : darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              S{i + 1} {sectionSubmitted[i] ? `${sectionScores[i]}/10` : ''}
            </span>
          </div>
        ))}
        <div className={`ml-2 text-sm font-semibold whitespace-nowrap ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {submittedCount}/4 submitted
          {submittedCount > 0 && ` · ${sectionScores.reduce((s, v) => s + v, 0)}/${submittedCount * 10} correct`}
        </div>
      </div>

      {SECTION_CONFIGS.map((cfg, sectionIndex) => {
        const submitted = sectionSubmitted[sectionIndex];
        const errors = sectionErrors[sectionIndex];
        const feedback = sectionFeedback[sectionIndex];
        const feedbackLoading = sectionFeedbackLoading[sectionIndex];
        const feedbackError = sectionFeedbackError[sectionIndex];
        const feedbackOpen = sectionFeedbackOpen[sectionIndex];
        const sectionAnswers = answers.slice(cfg.offset, cfg.offset + 10);
        const hasAnyAnswer = sectionAnswers.some(a => a.trim());

        return (
          <div key={sectionIndex} className={`border-2 rounded-xl p-6 mb-6 transition-all ${
            submitted
              ? darkMode ? 'border-teal-700 bg-teal-900/10' : 'border-teal-300 bg-teal-50/50'
              : darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {cfg.audioLabel}
              </h3>
              {submitted && (
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  darkMode ? 'bg-teal-800 text-teal-200' : 'bg-teal-100 text-teal-700'
                }`}>
                  {sectionScores[sectionIndex]}/10
                </span>
              )}
            </div>

            <audio
              controls
              src={cfg.audioSrc}
              className="w-full rounded-lg"
              onPlay={() => { if (!hasStarted) { setHasStarted(true); startTimer(); } }}
            >
              Your browser does not support the audio element.
            </audio>

            <p className={`text-xs text-center mt-4 mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              You can replay the audio as many times as needed for practice.
            </p>

            <h4 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {cfg.title}
            </h4>
            <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {cfg.instruction}
            </p>

            <div className="space-y-4">
              {cfg.questions.map((question, idx) => {
                const answerIndex = cfg.offset + idx;
                const parts = question.split('________');
                const isError = submitted && errors.includes(answerIndex);
                const isCorrect = submitted && !errors.includes(answerIndex) && answers[answerIndex];

                return (
                  <div key={answerIndex} className={`p-4 rounded-lg ${
                    isError
                      ? darkMode ? 'bg-red-900/20 border-2 border-red-600' : 'bg-red-50 border-2 border-red-400'
                      : isCorrect
                      ? darkMode ? 'bg-green-900/20 border-2 border-green-600' : 'bg-green-50 border-2 border-green-400'
                      : darkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="flex items-start space-x-3 flex-wrap gap-y-2">
                      <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {parts[0]}
                      </span>
                      <input
                        type="text"
                        value={answers[answerIndex]}
                        onChange={(e) => {
                          const newAnswers = [...answers];
                          newAnswers[answerIndex] = e.target.value;
                          setAnswers(newAnswers);
                        }}
                        className={`flex-1 min-w-[120px] px-3 py-2 rounded border-2 transition-all ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-teal-500'
                            : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500'
                        } ${isError ? 'border-red-500' : isCorrect ? 'border-green-500' : ''}`}
                        placeholder="Your answer"
                      />
                      {parts[1] && (
                        <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {parts[1]}
                        </span>
                      )}
                    </div>
                    {submitted && isError && (
                      <p className={`text-xs mt-2 ml-1 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                        Correct answer: <strong>{correctAnswers[answerIndex][0]}</strong>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => handleSectionSubmit(sectionIndex)}
                disabled={!hasAnyAnswer}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-semibold transition-all ${
                  !hasAnyAnswer
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : submitted
                    ? darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    : darkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white'
                }`}
              >
                {submitted ? (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Re-submit Section</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Section</span>
                  </>
                )}
              </button>

              {submitted && (
                <button
                  onClick={() => toggleFeedback(sectionIndex)}
                  disabled={feedbackLoading}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-semibold transition-all ${
                    darkMode
                      ? 'bg-blue-700 hover:bg-blue-600 text-white disabled:opacity-60'
                      : 'bg-[#1E3A8A] hover:bg-[#1e40af] text-white disabled:opacity-60'
                  }`}
                >
                  {feedbackLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>{feedbackLoading ? 'Analysing...' : feedbackOpen ? 'Hide Feedback' : 'AI Feedback'}</span>
                  {!feedbackLoading && (feedbackOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                </button>
              )}
            </div>

            {/* AI Feedback Panel */}
            {submitted && feedbackOpen && (
              <div className={`mt-4 rounded-xl border-2 overflow-hidden ${
                darkMode ? 'border-blue-800 bg-gray-900/60' : 'border-blue-200 bg-blue-50/60'
              }`}>
                {feedbackLoading && (
                  <div className="flex flex-col items-center justify-center py-10 space-y-3">
                    <Loader2 className="w-10 h-10 text-teal-500 animate-spin" />
                    <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Analysing your answers…</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>This may take a few seconds</p>
                  </div>
                )}

                {!feedbackLoading && feedbackError && (
                  <div className="flex flex-col items-center justify-center py-8 space-y-3">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                    <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{feedbackError}</p>
                    <button
                      onClick={() => fetchSectionFeedback(sectionIndex)}
                      className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {!feedbackLoading && !feedbackError && feedback && (
                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div className={`rounded-xl p-4 text-center ${darkMode ? 'bg-teal-900/30' : 'bg-teal-50'}`}>
                        <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Raw Score</p>
                        <p className={`text-3xl font-bold ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                          {feedback.raw_score}<span className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>/10</span>
                        </p>
                      </div>
                      <div className={`rounded-xl p-4 text-center ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                        <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Estimated Band</p>
                        <p className={`text-3xl font-bold ${darkMode ? 'text-blue-300' : 'text-[#1E3A8A]'}`}>
                          {feedback.estimated_band}
                        </p>
                      </div>
                    </div>

                    <div className={`mb-5 p-4 rounded-xl border ${
                      darkMode ? 'bg-amber-900/20 border-amber-800' : 'bg-amber-50 border-amber-200'
                    }`}>
                      <h4 className={`font-bold text-xs uppercase tracking-wide mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Examiner's Overall Tip
                      </h4>
                      <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {feedback.overall_tip}
                      </p>
                    </div>

                    {feedback.wrong_answers && feedback.wrong_answers.length > 0 && (
                      <div>
                        <h4 className={`font-bold text-xs uppercase tracking-wide mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Question-by-Question Breakdown ({feedback.wrong_answers.length} incorrect)
                        </h4>
                        <div className="space-y-3">
                          {feedback.wrong_answers.map((wa) => (
                            <div key={wa.question} className={`p-4 rounded-xl border ${
                              darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
                            }`}>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-600 text-white text-xs font-bold">
                                  Q{wa.question}
                                </span>
                                <span className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Incorrect</span>
                              </div>
                              <p className={`text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                <span className="font-semibold">Correct answer:</span> {wa.correct}
                              </p>
                              <p className={`text-sm mb-2 italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{wa.explanation}</p>
                              <div className={`flex items-start gap-2 p-2 rounded-lg ${darkMode ? 'bg-teal-900/30' : 'bg-teal-50'}`}>
                                <span className={`text-xs font-bold mt-0.5 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>TIP</span>
                                <p className={`text-sm ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>{wa.suggestion}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Final results — only shown when all 4 sections submitted */}
      {allSectionsSubmitted && (
        <div className={`border-2 rounded-xl p-6 mt-2 ${
          darkMode ? 'border-teal-600 bg-teal-900/20' : 'border-teal-400 bg-teal-50'
        }`}>
          <div className="text-center mb-4">
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Final Results
            </h3>
            <div className="flex items-center justify-center space-x-8">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Raw Score</p>
                <p className={`text-4xl font-bold ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                  {totalScore}/40
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Estimated Band</p>
                <p className={`text-4xl font-bold ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                  {totalBand?.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {SECTION_CONFIGS.map((cfg, i) => (
              <div key={i} className={`rounded-lg p-3 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>S{i + 1}</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>{sectionScores[i]}/10</p>
              </div>
            ))}
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong>Note:</strong> Your band score is calculated from your total raw score out of 40. You can re-submit any section above to improve your score.
            </p>
            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Time taken: {formatTime(timeElapsed)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
