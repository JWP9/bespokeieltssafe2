import { useState, useRef, useEffect } from 'react';
import { Clock, Mic, Square, Play, Pause, RotateCcw, Sparkles, Plus } from 'lucide-react';
import { speakingData } from '../data/speakingData';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from '../components/SearchBar';
import TopicSubmissionModal from '../components/TopicSubmissionModal';
import BandScoreEstimator from '../components/BandScoreEstimator';

type Tab = 'part1' | 'part2' | 'part3';

interface SavedRecording {
  audioUrl: string;
  duration: number;
  band: number;
}

interface AIFeedback {
  band: number;
  feedback: string;
}

export default function Speaking() {
  const [activeTab, setActiveTab] = useState<Tab>('part1');
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [revealedQuestions, setRevealedQuestions] = useState<Set<string>>(new Set());
  const [timers, setTimers] = useState<Map<string, number>>(new Map());
  const [activeTimers, setActiveTimers] = useState<Set<string>>(new Set());
  const [isRecording, setIsRecording] = useState(false);
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Map<string, Blob>>(new Map());
  const [selectedBand, setSelectedBand] = useState<Map<string, number>>(new Map());
  const [savedRecordings, setSavedRecordings] = useState<Map<string, SavedRecording>>(new Map());
  const [isPlaying, setIsPlaying] = useState<Map<string, boolean>>(new Map());
  const [playbackProgress, setPlaybackProgress] = useState<Map<string, number>>(new Map());
  const [isSaving, setIsSaving] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<Map<string, AIFeedback>>(new Map());
  const [isLoadingAI, setIsLoadingAI] = useState<Map<string, boolean>>(new Map());
  const [showTopicSubmission, setShowTopicSubmission] = useState(false);
  const [showBandEstimator, setShowBandEstimator] = useState(false);
  const [estimatorData, setEstimatorData] = useState<{audioBlob: Blob; topic: string; part: number} | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const { user } = useAuth();

  useEffect(() => {
    return () => {
      timerIntervalsRef.current.forEach(interval => clearInterval(interval));
      audioElementsRef.current.forEach(audio => {
        audio.pause();
        URL.revokeObjectURL(audio.src);
      });
    };
  }, []);

  useEffect(() => {
    if (user) {
      loadSavedRecordings();
      loadAIFeedback();
    }
  }, [user]);

  const loadSavedRecordings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('speaking_practice')
        .select('*')
        .eq('user_id', user.id)
        .eq('part', 2)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const recordings = new Map<string, SavedRecording>();
        for (const record of data) {
          if (record.recording_url) {
            recordings.set(record.question_id, {
              audioUrl: record.recording_url,
              duration: 0,
              band: record.self_band || 0
            });
          }
        }
        setSavedRecordings(recordings);
      }
    } catch (error) {
      console.error('Error loading recordings:', error);
    }
  };

  const loadAIFeedback = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ai_feedback')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const feedbackMap = new Map<string, AIFeedback>();
        for (const record of data) {
          if (record.question_id) {
            feedbackMap.set(record.question_id, {
              band: record.band,
              feedback: record.feedback,
            });
          }
        }
        console.log('Loaded AI feedback from DB:', feedbackMap);
        setAiFeedback(feedbackMap);
      }
    } catch (error) {
      console.error('Error loading AI feedback:', error);
    }
  };

  const toggleTopic = (topic: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topic)) {
      newExpanded.delete(topic);
    } else {
      newExpanded.add(topic);
    }
    setExpandedTopics(newExpanded);
  };

  const toggleQuestion = (questionId: string) => {
    const newRevealed = new Set(revealedQuestions);
    if (newRevealed.has(questionId)) {
      newRevealed.delete(questionId);
    } else {
      newRevealed.add(questionId);
    }
    setRevealedQuestions(newRevealed);
  };

  const startTimer = (id: string, duration: number) => {
    const newTimers = new Map(timers);
    newTimers.set(id, duration);
    setTimers(newTimers);

    const newActive = new Set(activeTimers);
    newActive.add(id);
    setActiveTimers(newActive);

    const interval = setInterval(() => {
      setTimers(prev => {
        const newMap = new Map(prev);
        const current = newMap.get(id) || 0;
        if (current > 0) {
          newMap.set(id, current - 1);
          return newMap;
        } else {
          clearInterval(interval);
          timerIntervalsRef.current.delete(id);
          setActiveTimers(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
          return newMap;
        }
      });
    }, 1000);

    timerIntervalsRef.current.set(id, interval);
  };

  const stopTimer = (id: string) => {
    const interval = timerIntervalsRef.current.get(id);
    if (interval) {
      clearInterval(interval);
      timerIntervalsRef.current.delete(id);
    }
    setActiveTimers(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async (id: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const newBlobs = new Map(audioBlob);
        newBlobs.set(id, blob);
        setAudioBlob(newBlobs);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingId(id);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = (id: string, audioUrl?: string) => {
    const blob = audioBlob.get(id);
    const savedRecording = savedRecordings.get(id);

    if (!blob && !audioUrl && !savedRecording) return;

    const existingAudio = audioElementsRef.current.get(id);
    if (existingAudio) {
      if (isPlaying.get(id)) {
        existingAudio.pause();
        setIsPlaying(prev => {
          const newMap = new Map(prev);
          newMap.set(id, false);
          return newMap;
        });
        return;
      } else {
        existingAudio.play();
        setIsPlaying(prev => {
          const newMap = new Map(prev);
          newMap.set(id, true);
          return newMap;
        });
        return;
      }
    }

    const url = audioUrl || (savedRecording?.audioUrl) || (blob ? URL.createObjectURL(blob) : null);
    if (!url) return;

    const audio = new Audio(url);
    audioElementsRef.current.set(id, audio);

    audio.addEventListener('loadedmetadata', () => {
      if (savedRecording && !savedRecording.duration) {
        const newRecordings = new Map(savedRecordings);
        newRecordings.set(id, {
          ...savedRecording,
          duration: audio.duration
        });
        setSavedRecordings(newRecordings);
      }
    });

    audio.addEventListener('timeupdate', () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      setPlaybackProgress(prev => {
        const newMap = new Map(prev);
        newMap.set(id, progress);
        return newMap;
      });
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(prev => {
        const newMap = new Map(prev);
        newMap.set(id, false);
        return newMap;
      });
      setPlaybackProgress(prev => {
        const newMap = new Map(prev);
        newMap.set(id, 0);
        return newMap;
      });
    });

    audio.play();
    setIsPlaying(prev => {
      const newMap = new Map(prev);
      newMap.set(id, true);
      return newMap;
    });
  };

  const savePractice = async (part: number, topic: string, questionId: string) => {
    if (!user) {
      alert('Please log in to save your practice.');
      return;
    }

    const band = selectedBand.get(questionId);
    if (!band) {
      alert('Please select a band score before saving.');
      return;
    }

    const blob = audioBlob.get(questionId);
    if (!blob) {
      alert('No recording found. Please record first.');
      return;
    }

    setIsSaving(true);

    try {
      const fileName = `${user.id}/${questionId}-${Date.now()}.webm`;

      const { error: uploadError } = await supabase.storage
        .from('speaking-recordings')
        .upload(fileName, blob, {
          contentType: 'audio/webm',
          upsert: false
        });

      if (uploadError) {
        if (uploadError.message.includes('not found')) {
          alert('Storage bucket not configured. Saving practice without audio file.');
          const { error: dbError } = await supabase
            .from('speaking_practice')
            .upsert({
              user_id: user.id,
              part,
              topic,
              question_id: questionId,
              recording_url: null,
              self_band: band
            }, {
              onConflict: 'user_id,question_id'
            });

          if (dbError) throw dbError;
          alert('Practice saved successfully (without audio)!');
          setIsSaving(false);
          return;
        }
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from('speaking-recordings')
        .getPublicUrl(fileName);

      const audioUrl = publicUrlData.publicUrl;

      const { error: dbError } = await supabase
        .from('speaking_practice')
        .upsert({
          user_id: user.id,
          part,
          topic,
          question_id: questionId,
          recording_url: audioUrl,
          self_band: band
        }, {
          onConflict: 'user_id,question_id'
        });

      if (dbError) throw dbError;

      const newRecordings = new Map(savedRecordings);
      newRecordings.set(questionId, {
        audioUrl,
        duration: 0,
        band
      });
      setSavedRecordings(newRecordings);

      alert('Practice saved successfully!');

      const newBlobs = new Map(audioBlob);
      newBlobs.delete(questionId);
      setAudioBlob(newBlobs);

      setRecordingId(null);
    } catch (error) {
      console.error('Error saving practice:', error);
      alert('Failed to save practice. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const reRecord = (questionId: string) => {
    const audio = audioElementsRef.current.get(questionId);
    if (audio) {
      audio.pause();
      URL.revokeObjectURL(audio.src);
      audioElementsRef.current.delete(questionId);
    }

    const newBlobs = new Map(audioBlob);
    newBlobs.delete(questionId);
    setAudioBlob(newBlobs);

    const newRecordings = new Map(savedRecordings);
    newRecordings.delete(questionId);
    setSavedRecordings(newRecordings);

    setIsPlaying(prev => {
      const newMap = new Map(prev);
      newMap.delete(questionId);
      return newMap;
    });

    setPlaybackProgress(prev => {
      const newMap = new Map(prev);
      newMap.delete(questionId);
      return newMap;
    });

    setAiFeedback(prev => {
      const newMap = new Map(prev);
      newMap.delete(questionId);
      return newMap;
    });
  };

  const getAIFeedback = async (questionId: string, recordingUrl: string) => {
    console.log('getAIFeedback called with:', { questionId, recordingUrl });
    if (!user) {
      alert('Please log in to get AI feedback.');
      return;
    }

    setIsLoadingAI(prev => {
      const newMap = new Map(prev);
      newMap.set(questionId, true);
      return newMap;
    });

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/predict-band-score`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recordingUrl,
          questionId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI feedback');
      }

      const data: AIFeedback = await response.json();
      console.log('AI Feedback received:', data);

      setAiFeedback(prev => {
        const newMap = new Map(prev);
        newMap.set(questionId, data);
        console.log('Updated aiFeedback map:', newMap);
        return newMap;
      });
    } catch (error) {
      console.error('Error getting AI feedback:', error);
      alert('Failed to get AI feedback. Please try again.');
    } finally {
      setIsLoadingAI(prev => {
        const newMap = new Map(prev);
        newMap.set(questionId, false);
        return newMap;
      });
    }
  };

  const part1Data = speakingData.filter(item => item.part === 1);
  const part2Data = speakingData.filter(item => item.part === 2);
  const part3Data = speakingData.filter(item => item.part === 3);

  const renderPart1And3 = (data: typeof speakingData, part: number) => (
    <div className="space-y-4">
      {data.map((item, topicIndex) => {
        const topicId = `part${part}-${topicIndex}`;
        const isExpanded = expandedTopics.has(topicId);

        return (
          <div
            key={topicId}
            id={`topic-${item.topic.replace(/\s+/g, '-').toLowerCase()}`}
            className="bg-[#1E3A8A] rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleTopic(topicId)}
              className="w-full px-6 py-4 text-left text-white font-semibold hover:bg-[#1e40af] transition-colors flex items-center justify-between"
            >
              <span>{item.topic}</span>
              <span className="text-xl">{isExpanded ? '−' : '+'}</span>
            </button>

            {isExpanded && (
              <div className="p-6 space-y-4 bg-[#1E3A8A]/50">
                {item.questions?.map((question, qIndex) => {
                  const questionId = `${topicId}-q${qIndex}`;
                  const isRevealed = revealedQuestions.has(questionId);
                  const timerSeconds = timers.get(questionId) || 30;
                  const isTimerActive = activeTimers.has(questionId);

                  return (
                    <div key={questionId} className="space-y-3">
                      <button
                        onClick={() => toggleQuestion(questionId)}
                        className="w-full text-left bg-white/10 hover:bg-white/20 p-4 rounded-lg text-white transition-colors"
                      >
                        {question}
                      </button>

                      {isRevealed && (
                        <div className="ml-4 space-y-3">
                          <div className="p-4 bg-white/5 rounded-lg text-white/90">
                            <p className="font-medium mb-2">Sample Answer:</p>
                            <p>{item.answers?.[qIndex]}</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => isTimerActive ? stopTimer(questionId) : startTimer(questionId, 30)}
                              className="flex items-center gap-2 px-4 py-2 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-lg transition-colors"
                            >
                              <Clock className="w-4 h-4" />
                              {isTimerActive ? 'Stop' : 'Start'} Timer
                            </button>
                            <span className="text-[#DC2626] font-bold text-lg">
                              {formatTime(timerSeconds)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderPart2 = () => (
    <div className="space-y-4">
      {part2Data.map((item, index) => {
        const topicId = `part2-${index}`;
        const isExpanded = expandedTopics.has(topicId);
        const prepTimerId = `${topicId}-prep`;
        const speakTimerId = `${topicId}-speak`;
        const prepSeconds = timers.get(prepTimerId) || 60;
        const speakSeconds = timers.get(speakTimerId) || 120;
        const isPrepActive = activeTimers.has(prepTimerId);
        const isSpeakActive = activeTimers.has(speakTimerId);
        const isCurrentRecording = isRecording && recordingId === topicId;
        const hasRecording = audioBlob.has(topicId) || savedRecordings.has(topicId);
        const savedRecording = savedRecordings.get(topicId);
        const isAudioPlaying = isPlaying.get(topicId) || false;
        const progress = playbackProgress.get(topicId) || 0;

        return (
          <div
            key={topicId}
            id={`topic-${item.topic.replace(/\s+/g, '-').toLowerCase()}`}
            className="bg-[#1E3A8A] rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleTopic(topicId)}
              className="w-full px-6 py-4 text-left text-white font-semibold hover:bg-[#1e40af] transition-colors flex items-center justify-between"
            >
              <span>{item.topic}</span>
              <span className="text-xl">{isExpanded ? '−' : '+'}</span>
            </button>

            {isExpanded && (
              <div className="p-6 space-y-4 bg-[#1E3A8A]/50">
                <div className="p-4 bg-white/10 rounded-lg text-white">
                  <p className="font-semibold mb-3">Cue Card:</p>
                  <p className="whitespace-pre-line">{item.cue}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-white font-medium">Preparation Time (1 min)</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => isPrepActive ? stopTimer(prepTimerId) : startTimer(prepTimerId, 60)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-lg transition-colors"
                      >
                        <Clock className="w-4 h-4" />
                        {isPrepActive ? 'Stop' : 'Start'}
                      </button>
                      <span className="text-[#DC2626] font-bold text-lg">
                        {formatTime(prepSeconds)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-white font-medium">Speaking Time (2 min)</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => isSpeakActive ? stopTimer(speakTimerId) : startTimer(speakTimerId, 120)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-lg transition-colors"
                      >
                        <Clock className="w-4 h-4" />
                        {isSpeakActive ? 'Stop' : 'Start'}
                      </button>
                      <span className="text-[#DC2626] font-bold text-lg">
                        {formatTime(speakSeconds)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {!hasRecording ? (
                    <button
                      onClick={() => isCurrentRecording ? stopRecording() : startRecording(topicId)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isCurrentRecording
                          ? 'bg-[#DC2626] hover:bg-red-700 text-white'
                          : 'bg-[#0D9488] hover:bg-[#0f766e] text-white'
                      }`}
                    >
                      {isCurrentRecording ? (
                        <>
                          <Square className="w-4 h-4" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4" />
                          Record
                        </>
                      )}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => playAudio(topicId)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-lg transition-colors"
                      >
                        {isAudioPlaying ? (
                          <>
                            <Pause className="w-4 h-4" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            Play
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => reRecord(topicId)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Re-record
                      </button>
                    </>
                  )}
                </div>

                {hasRecording && (
                  <div className="space-y-2">
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#0D9488] h-full transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    {savedRecording && savedRecording.duration > 0 && (
                      <p className="text-white/70 text-sm">
                        Duration: {formatTime(Math.floor(savedRecording.duration))}
                      </p>
                    )}
                  </div>
                )}

                {hasRecording && (
                  <div className="space-y-3 pt-4 border-t border-white/20">
                    <p className="text-white font-medium">Self-Assessment:</p>
                    <select
                      value={selectedBand.get(topicId) || savedRecording?.band || ''}
                      onChange={(e) => {
                        const newMap = new Map(selectedBand);
                        newMap.set(topicId, parseInt(e.target.value));
                        setSelectedBand(newMap);
                      }}
                      className="px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20"
                      disabled={!!savedRecording}
                    >
                      <option value="">Select Band Score</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(band => (
                        <option key={band} value={band} className="bg-[#1E3A8A]">
                          Band {band}
                        </option>
                      ))}
                    </select>

                    {(selectedBand.get(topicId) || savedRecording?.band) && (
                      <div className="p-3 bg-white/5 rounded text-white/80 text-sm">
                        <p className="font-medium mb-1">Band {selectedBand.get(topicId) || savedRecording?.band} Tip:</p>
                        <p>
                          {(selectedBand.get(topicId) || savedRecording?.band || 0) <= 4
                            ? 'Focus on basic sentence structure and pronunciation.'
                            : (selectedBand.get(topicId) || savedRecording?.band || 0) <= 6
                            ? 'Work on fluency and use a wider range of vocabulary.'
                            : 'Excellent! Keep practicing complex structures and natural phrasing.'}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      {!savedRecording && (
                        <button
                          onClick={() => savePractice(2, item.topic, topicId)}
                          disabled={isSaving}
                          className="px-4 py-2 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSaving ? 'Saving...' : 'Save Practice'}
                        </button>
                      )}
                      {hasRecording && audioBlob.get(topicId) && (
                        <button
                          onClick={() => {
                            const blob = audioBlob.get(topicId);
                            if (blob) {
                              setEstimatorData({ audioBlob: blob, topic: item.topic, part: 2 });
                              setShowBandEstimator(true);
                            }
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          Estimate My Band
                        </button>
                      )}
                    </div>

                    {savedRecording && !aiFeedback.has(topicId) && (
                      <button
                        onClick={() => getAIFeedback(topicId, savedRecording.audioUrl)}
                        disabled={isLoadingAI.get(topicId)}
                        className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg shadow hover:from-teal-600 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        {isLoadingAI.get(topicId) ? 'Analyzing...' : 'Get AI Band Prediction'}
                      </button>
                    )}
                  </div>
                )}

                {(() => {
                  const hasFeedback = aiFeedback.has(topicId);
                  console.log('Rendering AI feedback section:', { topicId, hasFeedback, feedbackData: aiFeedback.get(topicId) });
                  return hasFeedback;
                })() && (
                  <div className="mt-4 p-6 bg-gradient-to-br from-teal-500/10 to-blue-600/10 rounded-lg border border-teal-500/30">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-teal-400" />
                        AI Band Prediction
                      </h3>
                      <div className="text-4xl font-bold text-teal-400">
                        {aiFeedback.get(topicId)!.band}
                      </div>
                    </div>

                    <div className="space-y-4 text-white/90 text-sm">
                      {aiFeedback.get(topicId)!.feedback.split('\n\n').map((section, idx) => {
                        const lines = section.split('\n');
                        const title = lines[0];
                        const isTitle = title.startsWith('**') && title.endsWith('**');

                        if (isTitle) {
                          return (
                            <div key={idx} className="space-y-2">
                              <h4 className="text-teal-400 font-semibold">
                                {title.replace(/\*\*/g, '')}
                              </h4>
                              {lines.slice(1).map((line, lineIdx) => {
                                if (line.startsWith('- ')) {
                                  return (
                                    <div key={lineIdx} className="flex items-start gap-2 ml-4">
                                      <span className="text-teal-400 mt-1">•</span>
                                      <span>{line.substring(2)}</span>
                                    </div>
                                  );
                                }
                                return line ? <p key={lineIdx} className="leading-relaxed">{line}</p> : null;
                              })}
                            </div>
                          );
                        }

                        return (
                          <div key={idx} className="leading-relaxed">
                            {lines.map((line, lineIdx) => {
                              if (line.startsWith('- ')) {
                                return (
                                  <div key={lineIdx} className="flex items-start gap-2 ml-4">
                                    <span className="text-teal-400 mt-1">•</span>
                                    <span>{line.substring(2)}</span>
                                  </div>
                                );
                              }
                              return line ? <p key={lineIdx}>{line}</p> : null;
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="p-4 bg-white/5 rounded-lg text-white/90">
                  <p className="font-medium mb-2">Sample Response:</p>
                  <p>{item.sample}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen pt-16 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            IELTS Speaking Practice
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Practice all three parts of the IELTS Speaking test with interactive timers and recording
          </p>
        </div>

        <div className="flex justify-center mb-8 gap-2">
          <button
            onClick={() => setActiveTab('part1')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'part1'
                ? 'bg-[#0D9488] text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Part 1
          </button>
          <button
            onClick={() => setActiveTab('part2')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'part2'
                ? 'bg-[#0D9488] text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Part 2
          </button>
          <button
            onClick={() => setActiveTab('part3')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'part3'
                ? 'bg-[#0D9488] text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Part 3
          </button>
        </div>

        <SearchBar
          onResultClick={(part, topic) => {
            if (part === 1) setActiveTab('part1');
            else if (part === 2) setActiveTab('part2');
            else setActiveTab('part3');
            setTimeout(() => {
              const element = document.getElementById(`topic-${topic.replace(/\s+/g, '-').toLowerCase()}`);
              element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
          }}
        />

        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              {activeTab === 'part1' && 'Part 1: Introduction and interview (4-5 minutes). Click questions to reveal sample answers and practice with a 30-second timer.'}
              {activeTab === 'part2' && 'Part 2: Individual long turn (3-4 minutes). Prepare for 1 minute, then speak for 2 minutes. Record your response and self-assess.'}
              {activeTab === 'part3' && 'Part 3: Two-way discussion (4-5 minutes). Explore topics in depth with discussion questions and sample answers.'}
            </p>
          </div>
          {activeTab === 'part3' && (
            <button
              onClick={() => setShowTopicSubmission(true)}
              className="ml-4 flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Suggest Topic</span>
            </button>
          )}
        </div>

        {activeTab === 'part1' && renderPart1And3(part1Data, 1)}
        {activeTab === 'part2' && renderPart2()}
        {activeTab === 'part3' && renderPart1And3(part3Data, 3)}
      </div>

      {showTopicSubmission && (
        <TopicSubmissionModal onClose={() => setShowTopicSubmission(false)} />
      )}

      {showBandEstimator && estimatorData && (
        <BandScoreEstimator
          audioBlob={estimatorData.audioBlob}
          topic={estimatorData.topic}
          part={estimatorData.part}
          onClose={() => {
            setShowBandEstimator(false);
            setEstimatorData(null);
          }}
        />
      )}
    </div>
  );
}
