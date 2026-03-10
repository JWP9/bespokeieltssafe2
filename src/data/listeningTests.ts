export interface ListeningQuestion {
  id: number;
  type: 'gap-fill' | 'multiple-choice' | 'multiple-choice-multiple' | 'matching' | 'map-labelling' | 'sentence-completion' | 'short-answer' | 'true-false-ng' | 'yes-no-ng' | 'classification' | 'matching-features' | 'matching-headings' | 'matching-information' | 'list-selection' | 'sentence-endings';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  maxWords?: number;
}

export interface ListeningSection {
  title: string;
  description: string;
  audioUrl: string;
  transcript: string;
  questions: ListeningQuestion[];
}

export interface ListeningTest {
  id: number;
  title: string;
  type: 'academic' | 'general';
  sections: ListeningSection[];
}

export const listeningTests: ListeningTest[] = [];

export const bandScoreConversion: { [key: number]: number } = {
  40: 9.0, 39: 8.5, 38: 8.5, 37: 8.0, 36: 8.0,
  35: 7.5, 34: 7.5, 33: 7.0, 32: 7.0, 31: 6.5,
  30: 6.5, 29: 6.5, 28: 6.0, 27: 6.0, 26: 6.0,
  25: 5.5, 24: 5.5, 23: 5.5, 22: 5.0, 21: 5.0,
  20: 5.0, 19: 4.5, 18: 4.5, 17: 4.0, 16: 4.0,
  15: 4.0, 14: 3.5, 13: 3.5, 12: 3.0, 11: 3.0,
  10: 3.0, 9: 2.5, 8: 2.5, 7: 2.5, 6: 2.0,
  5: 2.0, 4: 2.0, 3: 1.5, 2: 1.0, 1: 1.0, 0: 0
};

export const questionTypeExamples = [
  {
    type: 'gap-fill',
    name: 'Form/Note/Table/Summary Completion',
    description: 'Fill in missing information with words from the audio',
    example: 'The library opens at _____ AM on weekdays.'
  },
  {
    type: 'multiple-choice',
    name: 'Multiple Choice (Single Answer)',
    description: 'Choose one correct answer from options',
    example: 'What is the main topic of the lecture?'
  },
  {
    type: 'multiple-choice-multiple',
    name: 'Multiple Choice (Multiple Answers)',
    description: 'Choose TWO or THREE correct answers',
    example: 'Which TWO facilities are mentioned? (Choose TWO)'
  },
  {
    type: 'matching',
    name: 'Matching (Speakers to Opinions)',
    description: 'Match speakers to their statements or opinions',
    example: 'Match each person to their opinion about the project'
  },
  {
    type: 'map-labelling',
    name: 'Plan/Map/Diagram Labelling',
    description: 'Label parts of a visual diagram with words from audio',
    example: 'Label the locations on the campus map'
  },
  {
    type: 'sentence-completion',
    name: 'Sentence Completion',
    description: 'Complete sentences with words from the recording',
    example: 'The research was conducted in _____'
  },
  {
    type: 'short-answer',
    name: 'Short Answer Questions',
    description: 'Answer questions with words from the audio (word limit)',
    example: 'What time does the tour begin? (NO MORE THAN TWO WORDS)'
  },
  {
    type: 'true-false-ng',
    name: 'True/False/Not Given',
    description: 'Decide if statements are True, False, or Not Given',
    example: 'The speaker has visited Australia before.'
  },
  {
    type: 'yes-no-ng',
    name: 'Yes/No/Not Given',
    description: 'Decide if statements match speaker\'s opinion (Yes/No/NG)',
    example: 'The writer believes technology improves education.'
  },
  {
    type: 'matching-features',
    name: 'Matching Features',
    description: 'Match items to features or characteristics',
    example: 'Match each country to its main export'
  },
  {
    type: 'matching-headings',
    name: 'Matching Headings',
    description: 'Match headings to sections of the talk',
    example: 'Choose the correct heading for each section'
  },
  {
    type: 'matching-information',
    name: 'Matching Information',
    description: 'Match information to specific sections',
    example: 'Which section mentions the cost of membership?'
  },
  {
    type: 'list-selection',
    name: 'List Selection',
    description: 'Select items from a list that match criteria',
    example: 'Which THREE factors are mentioned?'
  },
  {
    type: 'sentence-endings',
    name: 'Classification/Sentence Endings',
    description: 'Complete sentences by matching beginning to ending',
    example: 'The main advantage of solar energy is _____'
  }
];
