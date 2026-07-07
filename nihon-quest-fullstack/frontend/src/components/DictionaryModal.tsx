/**
 * Enhanced Dictionary Modal with Jisho.org API
 * 
 * Features:
 * - Jisho.org API integration for comprehensive word lookup
 * - Autocomplete with search suggestions
 * - JLPT level filtering
 * - Part of speech filtering
 * - Kanji information lookup
 * - Audio pronunciation (Web Speech API)
 * - Translation with cross-checking
 * - Compact design positioned near toolbar
 * - Gold theme with shadcn UI components
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Maximize2, Search, Volume2, Languages, Clock, TrendingUp, BookOpen, Sparkles, CheckCircle, AlertCircle, XCircle, Filter } from 'lucide-react';
import { dictionaryService, type DictionaryEntry } from '@/services/dictionaryService';
import { useAutocomplete } from '@/hooks/useAutocomplete';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DictionaryModal({ isOpen, onClose }: DictionaryModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<DictionaryEntry[]>([]);
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [kanjiInfo, setKanjiInfo] = useState<any>(null);
  const [crossCheck, setCrossCheck] = useState<any>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJLPT, setSelectedJLPT] = useState<string>('ALL');
  const [selectedPOS, setSelectedPOS] = useState<string>('ALL');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const { suggestions, setSuggestions, addToHistory, getSuggestions } = useAutocomplete();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (term?: string) => {
    const searchValue = term || searchTerm;
    if (!searchValue.trim()) return;
    
    setIsLoading(true);
    setCrossCheck(null);
    
    try {
      const detectedLang = dictionaryService.detectLanguage(searchValue);
      
      const entries = await dictionaryService.lookupWord(searchValue);
      
      // Apply filters
      let filteredResults = entries;
      if (selectedJLPT !== 'ALL') {
        filteredResults = entries.filter(e => e.jlptLevel?.includes(selectedJLPT));
      }
      if (selectedPOS !== 'ALL') {
        filteredResults = entries.filter(e => 
          e.partOfSpeech?.some(pos => pos.toLowerCase().includes(selectedPOS.toLowerCase()))
        );
      }
      
      setResults(filteredResults);

      if (searchValue.length === 1 && detectedLang === 'ja') {
        const info = await dictionaryService.getKanjiInfo(searchValue);
        setKanjiInfo(info);
      } else {
        setKanjiInfo(null);
      }

      const targetLang = detectedLang === 'ja' ? 'en' : 'ja';
      const sourceLang = detectedLang === 'ja' ? 'ja' : 'en';
      const translated = await dictionaryService.translateText(searchValue, sourceLang, targetLang);
      setTranslation(translated);

      if (searchValue && translated) {
        const check = await dictionaryService.crossCheckTranslation(searchValue, translated);
        setCrossCheck(check);
      }

      addToHistory(searchValue);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = async (value: string) => {
    setSearchTerm(value);
    setSelectedSuggestionIndex(-1);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      const newSuggestions = await getSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    }, 300);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setTimeout(() => handleSearch(suggestion), 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
        handleSuggestionClick(suggestions[selectedSuggestionIndex].text);
      } else {
        handleSearch();
      }
      setShowSuggestions(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => prev > -1 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const speakJapanese = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="fixed top-20 right-4 z-[9999] w-[450px] max-h-[calc(100vh-120px)] bg-white rounded-xl shadow-2xl border-4 border-yellow-400/30 overflow-hidden flex flex-col"
      >
        {/* Header - Gold Theme */}
        <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <h2 className="text-lg font-bold">辞書 Dictionary</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-1.5 rounded transition-colors ${
                showFilters ? 'bg-white/30' : 'hover:bg-white/20'
              }`}
              title="Toggle Filters"
            >
              <Filter className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-white/20 rounded transition-colors"
              title={isMinimized ? 'Maximize' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Search Bar */}
            <div className="p-3 border-b bg-gradient-to-r from-yellow-50 to-amber-50">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600 z-10" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onFocus={async () => {
                      const sugg = await getSuggestions(searchTerm);
                      setSuggestions(sugg);
                      setShowSuggestions(true);
                    }}
                    placeholder="日本語 or English..."
                    className="w-full pl-9 pr-3 py-2 border-2 border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors text-sm"
                    autoComplete="off"
                    lang="ja"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setResults([]);
                        setTranslation('');
                        setCrossCheck(null);
                        setKanjiInfo(null);
                        setShowSuggestions(false);
                        inputRef.current?.focus();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  
                  {/* Autocomplete Suggestions */}
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      ref={suggestionsRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-yellow-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                    >
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={`${suggestion.text}-${index}`}
                          onClick={() => handleSuggestionClick(suggestion.text)}
                          className={`w-full px-3 py-2 flex items-center gap-2 hover:bg-yellow-50 transition-colors text-left text-sm border-b border-gray-100 last:border-0 ${
                            index === selectedSuggestionIndex ? 'bg-yellow-100' : ''
                          }`}
                        >
                          {suggestion.type === 'history' ? (
                            <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          ) : suggestion.type === 'popular' ? (
                            <TrendingUp className="w-3 h-3 text-amber-500 flex-shrink-0" />
                          ) : (
                            <BookOpen className="w-3 h-3 text-yellow-600 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{suggestion.text}</p>
                            {suggestion.preview && (
                              <p className="text-xs text-gray-500 truncate">{suggestion.preview}</p>
                            )}
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
                <Button 
                  onClick={() => handleSearch()} 
                  disabled={isLoading}
                  size="sm"
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white border-none"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    'Search'
                  )}
                </Button>
              </div>

              {/* Filters */}
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mt-2 pt-2 border-t border-yellow-200 space-y-2"
                >
                  {/* JLPT Level */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">JLPT Level:</p>
                    <div className="flex gap-1">
                      {['ALL', 'N5', 'N4', 'N3', 'N2', 'N1'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setSelectedJLPT(level)}
                          className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                            selectedJLPT === level
                              ? 'bg-yellow-500 text-white scale-105'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Part of Speech */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Part of Speech:</p>
                    <div className="flex gap-1 flex-wrap">
                      {['ALL', 'Noun', 'Verb', 'Adjective', 'Particle'].map((pos) => (
                        <button
                          key={pos}
                          onClick={() => setSelectedPOS(pos)}
                          className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                            selectedPOS === pos
                              ? 'bg-amber-500 text-white scale-105'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {/* Translation */}
              {translation && (
                <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-start gap-2">
                      <Languages className="w-4 h-4 text-amber-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 mb-1">Translation</p>
                        <p className="text-sm font-semibold">{translation}</p>
                        
                        {crossCheck && crossCheck.confidence > 0 && (
                          <div className={`mt-2 flex items-start gap-1 p-2 rounded text-xs ${
                            crossCheck.confidence > 70 ? 'bg-green-50 border border-green-200' :
                            crossCheck.confidence > 40 ? 'bg-yellow-50 border border-yellow-200' :
                            'bg-red-50 border border-red-200'
                          }`}>
                            {crossCheck.confidence > 70 ? (
                              <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                            ) : crossCheck.confidence > 40 ? (
                              <AlertCircle className="w-3 h-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                            ) : (
                              <XCircle className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                            )}
                            <div>
                              <p className="font-semibold">{crossCheck.confidence}% Match</p>
                              {crossCheck.issues.map((issue: string, i: number) => (
                                <p key={i} className="text-gray-600">{issue}</p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Kanji Info */}
              {kanjiInfo && (
                <Card className="border-amber-300">
                  <CardContent className="pt-3 pb-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-amber-600">{kanjiInfo.kanji}</span>
                        <div className="flex-1">
                          <p className="text-xs text-gray-600">Meanings:</p>
                          <p className="text-sm font-semibold">{kanjiInfo.meanings?.join(', ')}</p>
                        </div>
                      </div>
                      {kanjiInfo.kun_readings && (
                        <div>
                          <p className="text-xs text-gray-600">Kun: {kanjiInfo.kun_readings.join(', ')}</p>
                        </div>
                      )}
                      {kanjiInfo.on_readings && (
                        <div>
                          <p className="text-xs text-gray-600">On: {kanjiInfo.on_readings.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Dictionary Results */}
              {results.length > 0 && (
                <div className="space-y-2">
                  {results.map((entry, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow border-yellow-200">
                      <CardContent className="pt-3 pb-3">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-amber-700">
                                  {entry.word}
                                </h3>
                                <button
                                  onClick={() => speakJapanese(entry.word)}
                                  className="p-1 hover:bg-yellow-100 rounded-full transition-colors"
                                  title="Pronounce"
                                >
                                  <Volume2 className="w-3 h-3 text-amber-600" />
                                </button>
                              </div>
                              {entry.reading && entry.reading !== entry.word && (
                                <p className="text-sm text-gray-600 mb-1">{entry.reading}</p>
                              )}
                            </div>
                            <div className="flex flex-col gap-1 items-end">
                              {entry.commonWords && (
                                <Badge variant="default" className="bg-green-500 text-white text-xs">Common</Badge>
                              )}
                              {entry.jlptLevel && (
                                <Badge variant="secondary" className="bg-blue-500 text-white text-xs">
                                  {entry.jlptLevel}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {entry.partOfSpeech && entry.partOfSpeech.length > 0 && (
                            <div className="flex gap-1 flex-wrap">
                              {entry.partOfSpeech.slice(0, 3).map((pos, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {pos}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <div className="text-sm">
                            <ul className="list-disc list-inside space-y-0.5">
                              {entry.meanings.slice(0, 5).map((meaning, i) => (
                                <li key={i} className="text-gray-700">{meaning}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* No Results */}
              {!isLoading && !translation && results.length === 0 && searchTerm && (
                <div className="text-center py-8 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No results found</p>
                  <p className="text-xs">Try a different search term</p>
                </div>
              )}

              {/* Empty State */}
              {!isLoading && !searchTerm && (
                <div className="text-center py-8 text-gray-400">
                  <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Start typing to search</p>
                  <p className="text-xs">Powered by Jisho.org</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Minimized State */}
        {isMinimized && (
          <div className="p-3 text-center">
            <p className="text-sm text-gray-600">Dictionary minimized</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default DictionaryModal;
