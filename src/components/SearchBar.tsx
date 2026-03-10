import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { speakingData } from '../data/speakingData';

interface SearchResult {
  part: number;
  topic: string;
  questionIndex?: number;
  question?: string;
  answer?: string;
  matchType: 'topic' | 'question' | 'answer';
}

interface SearchBarProps {
  onResultClick: (part: number, topic: string) => void;
}

declare const Fuse: any;

export default function SearchBar({ onResultClick }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    // Prepare search data
    const searchData: any[] = [];
    speakingData.forEach(item => {
      // Add topic
      searchData.push({
        type: 'topic',
        part: item.part,
        topic: item.topic,
        text: item.topic,
      });

      // Add questions
      if (item.questions) {
        item.questions.forEach((q, idx) => {
          searchData.push({
            type: 'question',
            part: item.part,
            topic: item.topic,
            questionIndex: idx,
            question: q,
            text: q,
          });
        });
      }

      // Add answers
      if (item.answers) {
        item.answers.forEach((a, idx) => {
          searchData.push({
            type: 'answer',
            part: item.part,
            topic: item.topic,
            questionIndex: idx,
            answer: a,
            text: a,
          });
        });
      }

      // Add Part 2 cue card
      if (item.cue) {
        searchData.push({
          type: 'question',
          part: item.part,
          topic: item.topic,
          question: item.cue,
          text: item.cue,
        });
      }

      // Add Part 2 sample
      if (item.sample) {
        searchData.push({
          type: 'answer',
          part: item.part,
          topic: item.topic,
          answer: item.sample,
          text: item.sample,
        });
      }
    });

    // Initialize Fuse.js
    const fuse = new Fuse(searchData, {
      keys: ['text'],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
    });

    const searchResults = fuse.search(query);
    const processedResults: SearchResult[] = searchResults
      .slice(0, 10)
      .map((result: any) => ({
        part: result.item.part,
        topic: result.item.topic,
        questionIndex: result.item.questionIndex,
        question: result.item.question,
        answer: result.item.answer,
        matchType: result.item.type,
      }));

    setResults(processedResults);
    setShowResults(true);
  }, [query]);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <mark key={i} className="bg-yellow-200 font-semibold">{part}</mark>
        : part
    );
  };

  const getPreview = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleResultClick = (result: SearchResult) => {
    onResultClick(result.part, result.topic);
    setShowResults(false);
    setQuery('');
  };

  return (
    <div className="relative mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search 500+ questions across all parts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          className="w-full pl-12 pr-4 py-4 rounded-lg bg-white shadow-md border-2 border-[#0D9488] focus:outline-none focus:ring-2 focus:ring-teal-600 text-lg"
        />
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-y-auto">
          {results.map((result, idx) => (
            <div
              key={idx}
              onClick={() => handleResultClick(result)}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    result.part === 1 ? 'bg-blue-100 text-blue-700' :
                    result.part === 2 ? 'bg-purple-100 text-purple-700' :
                    'bg-teal-100 text-teal-700'
                  }`}>
                    Part {result.part}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">{result.topic}</span>
                </div>
                <span className="text-xs text-gray-500 capitalize">{result.matchType}</span>
              </div>
              {result.question && (
                <p className="text-sm text-gray-800 mb-1">
                  {highlightMatch(getPreview(result.question, 80), query)}
                </p>
              )}
              {result.answer && (
                <p className="text-xs text-gray-600">
                  {highlightMatch(getPreview(result.answer, 120), query)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && query.length >= 2 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 text-center">
          <p className="text-gray-600 mb-2">No results found for "{query}"</p>
          <p className="text-sm text-gray-500">
            Try searching for 'work', 'environment', 'challenge', or 'education'
          </p>
        </div>
      )}
    </div>
  );
}
