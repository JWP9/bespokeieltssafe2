import { useState } from 'react';
import { Volume2, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import ListeningTest from '../components/ListeningTest';

export default function Listening() {
  const { darkMode } = useDarkMode();
  const [showGuide, setShowGuide] = useState(false);
  const [testType, setTestType] = useState<'academic' | 'general'>('academic');

  return (
    <div className={`min-h-screen pt-16 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Volume2 className={`w-20 h-20 ${darkMode ? 'text-teal-400' : 'text-teal-600'} mx-auto mb-4`} />
          <h1 className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            IELTS Listening Practice
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            Professional Test Platform • All 14 Official Question Types
          </p>
          <p className={`text-sm font-semibold ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
            ✓ 30-Minute Timer  ✓ One-Time Audio Playback  ✓ Instant Band Score
          </p>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 mb-8`}>
          <button
            onClick={() => setShowGuide(!showGuide)}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gradient-to-r from-teal-50 to-blue-50 hover:from-teal-100 hover:to-blue-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Info className={`w-6 h-6 ${darkMode ? 'text-teal-400' : 'text-teal-600'}`} />
              <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                How the IELTS Listening Test Works
              </span>
            </div>
            {showGuide ? (
              <ChevronUp className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            ) : (
              <ChevronDown className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            )}
          </button>

          {showGuide && (
            <div className={`mt-4 p-6 rounded-xl space-y-4 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
              <div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Test Format</h3>
                <p className="text-sm leading-relaxed">
                  The IELTS Listening test consists of 4 sections with 40 questions total. You have 30 minutes to listen and answer, plus 10 minutes to transfer answers to the answer sheet. Each section is heard ONLY ONCE.
                </p>
              </div>
              <div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>The 4 Sections</h3>
                <ul className="text-sm space-y-2 ml-4">
                  <li>• <span className="font-semibold">Section 1:</span> Everyday social conversation between two people (e.g., booking accommodation)</li>
                  <li>• <span className="font-semibold">Section 2:</span> Monologue in an everyday social context (e.g., a speech about local facilities)</li>
                  <li>• <span className="font-semibold">Section 3:</span> Conversation in an educational/training context (e.g., students discussing an assignment)</li>
                  <li>• <span className="font-semibold">Section 4:</span> Academic lecture/talk (e.g., a university lecture)</li>
                </ul>
              </div>
              <div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>All 14 Official Question Types</h3>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p>1. Form/Note/Table Completion</p>
                    <p>2. Multiple Choice (Single)</p>
                    <p>3. Multiple Choice (Multiple)</p>
                    <p>4. Matching (Speakers/Opinions)</p>
                    <p>5. Plan/Map/Diagram Labelling</p>
                    <p>6. Sentence Completion</p>
                    <p>7. Short Answer Questions</p>
                  </div>
                  <div className="space-y-1">
                    <p>8. True/False/Not Given</p>
                    <p>9. Yes/No/Not Given</p>
                    <p>10. Matching Features</p>
                    <p>11. Matching Headings</p>
                    <p>12. Matching Information</p>
                    <p>13. List Selection</p>
                    <p>14. Sentence Endings</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Key Tips</h3>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Spelling must be correct (British or American spelling accepted)</li>
                  <li>• Follow word limits exactly (e.g., "NO MORE THAN TWO WORDS")</li>
                  <li>• Read questions before the audio starts</li>
                  <li>• Write answers on the question paper during listening, transfer later</li>
                </ul>
              </div>
              <div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Band Score Conversion</h3>
                <p className="text-sm">
                  Scores are based on correct answers out of 40: Band 9 (39-40), Band 8.5 (37-38), Band 8 (35-36), Band 7.5 (33-34), Band 7 (30-32), Band 6.5 (26-29), Band 6 (23-25), Band 5.5 (18-22), Band 5 (16-17).
                </p>
              </div>
            </div>
          )}
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 mb-8`}>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button
              onClick={() => setTestType('academic')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                testType === 'academic'
                  ? darkMode
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-teal-600 text-white shadow-lg'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Academic
            </button>
            <button
              onClick={() => setTestType('general')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                testType === 'general'
                  ? darkMode
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-teal-600 text-white shadow-lg'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              General Training
            </button>
          </div>

          <ListeningTest testId={1} testType={testType} />
        </div>
      </div>
    </div>
  );
}
