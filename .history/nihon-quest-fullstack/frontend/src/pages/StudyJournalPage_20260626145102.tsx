import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookMarked, Plus, Check, Trash2, Calendar, Tag, Search, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { InlineFurigana } from '@/components/Furigana'

interface JournalEntry {
  id: string
  date: Date
  type: 'vocabulary' | 'grammar' | 'note' | 'achievement'
  title: string
  content: string
  japanese?: string
  reading?: string
  tags: string[]
  starred: boolean
}

interface ChecklistItem {
  id: string
  text: string
  completed: boolean
  dueDate?: Date
}

interface SavedDefinition {
  id: string
  word: string
  reading: string
  meaning: string
  example: string
  dateAdded: Date
  tags: string[]
}

export default function StudyJournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [definitions, setDefinitions] = useState<SavedDefinition[]>([])
  const [activeTab, setActiveTab] = useState<'journal' | 'checklist' | 'definitions'>('journal')
  const [searchQuery, setSearchQuery] = useState('')
  const [newEntryTitle, setNewEntryTitle] = useState('')
  const [newEntryContent, setNewEntryContent] = useState('')
  const [newChecklistItem, setNewChecklistItem] = useState('')
  const [showNewEntry, setShowNewEntry] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('studyJournal')
    const savedChecklist = localStorage.getItem('studyChecklist')
    const savedDefinitions = localStorage.getItem('savedDefinitions')
    
    if (savedEntries) setEntries(JSON.parse(savedEntries))
    if (savedChecklist) setChecklist(JSON.parse(savedChecklist))
    if (savedDefinitions) setDefinitions(JSON.parse(savedDefinitions))
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('studyJournal', JSON.stringify(entries))
  }, [entries])

  useEffect(() => {
    localStorage.setItem('studyChecklist', JSON.stringify(checklist))
  }, [checklist])

  useEffect(() => {
    localStorage.setItem('savedDefinitions', JSON.stringify(definitions))
  }, [definitions])

  const addJournalEntry = () => {
    if (!newEntryTitle.trim()) return

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      type: 'note',
      title: newEntryTitle,
      content: newEntryContent,
      tags: [],
      starred: false
    }

    setEntries([entry, ...entries])
    setNewEntryTitle('')
    setNewEntryContent('')
    setShowNewEntry(false)
  }

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id))
  }

  const toggleStar = (id: string) => {
    setEntries(entries.map(e => 
      e.id === id ? { ...e, starred: !e.starred } : e
    ))
  }

  const addChecklistItem = () => {
    if (!newChecklistItem.trim()) return

    const item: ChecklistItem = {
      id: Date.now().toString(),
      text: newChecklistItem,
      completed: false
    }

    setChecklist([...checklist, item])
    setNewChecklistItem('')
  }

  const toggleChecklistItem = (id: string) => {
    setChecklist(checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const deleteChecklistItem = (id: string) => {
    setChecklist(checklist.filter(item => item.id !== id))
  }

  const saveDefinition = (word: string, reading: string, meaning: string, example: string) => {
    const def: SavedDefinition = {
      id: Date.now().toString(),
      word,
      reading,
      meaning,
      example,
      dateAdded: new Date(),
      tags: []
    }

    setDefinitions([def, ...definitions])
  }

  const deleteDefinition = (id: string) => {
    setDefinitions(definitions.filter(d => d.id !== id))
  }

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredDefinitions = definitions.filter(def =>
    def.word.includes(searchQuery) ||
    def.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              📓 Study Journal
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Track your progress, save vocabulary, and stay organized!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">{entries.length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Entries</div>
            </CardContent>
          </Card>
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-600">
                {checklist.filter(i => i.completed).length}/{checklist.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">{definitions.length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Saved Words</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          <Button
            onClick={() => setActiveTab('journal')}
            variant={activeTab === 'journal' ? 'default' : 'outline'}
            className={activeTab === 'journal' ? 'bg-blue-600' : ''}
          >
            <BookMarked className="w-4 h-4 mr-2" />
            Journal
          </Button>
          <Button
            onClick={() => setActiveTab('checklist')}
            variant={activeTab === 'checklist' ? 'default' : 'outline'}
            className={activeTab === 'checklist' ? 'bg-green-600' : ''}
          >
            <Check className="w-4 h-4 mr-2" />
            Checklist ({checklist.filter(i => !i.completed).length})
          </Button>
          <Button
            onClick={() => setActiveTab('definitions')}
            variant={activeTab === 'definitions' ? 'default' : 'outline'}
            className={activeTab === 'definitions' ? 'bg-purple-600' : ''}
          >
            <Tag className="w-4 h-4 mr-2" />
            Vocabulary ({definitions.length})
          </Button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search your journal, words, or tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'journal' && (
            <motion.div
              key="journal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Add Entry Button */}
              {!showNewEntry && (
                <Button
                  onClick={() => setShowNewEntry(true)}
                  className="w-full mb-4 bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Journal Entry
                </Button>
              )}

              {/* New Entry Form */}
              {showNewEntry && (
                <Card className="mb-4 border-2 border-blue-300">
                  <CardContent className="pt-6">
                    <Input
                      placeholder="Entry title..."
                      value={newEntryTitle}
                      onChange={(e) => setNewEntryTitle(e.target.value)}
                      className="mb-3"
                    />
                    <textarea
                      placeholder="What did you learn today? Write your thoughts, notes, or achievements..."
                      value={newEntryContent}
                      onChange={(e) => setNewEntryContent(e.target.value)}
                      className="w-full p-3 border rounded-lg min-h-[120px] resize-none"
                    />
                    <div className="flex gap-2 mt-3">
                      <Button onClick={addJournalEntry} className="bg-blue-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Save Entry
                      </Button>
                      <Button onClick={() => setShowNewEntry(false)} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Journal Entries */}
              <div className="space-y-3">
                {filteredEntries.length === 0 ? (
                  <Card className="border-2 border-dashed border-gray-300">
                    <CardContent className="pt-12 pb-12 text-center text-gray-500">
                      <BookMarked className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-lg mb-2">No journal entries yet</p>
                      <p className="text-sm">Start documenting your Japanese learning journey!</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredEntries.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <Card className={`border-2 ${entry.starred ? 'border-yellow-400 bg-yellow-50' : 'border-blue-200'}`}>
                        <CardContent className="pt-4 pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-800">{entry.title}</h3>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(entry.date).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => toggleStar(entry.id)}
                                className="text-yellow-500 hover:text-yellow-600"
                              >
                                <Star className="w-5 h-5" fill={entry.starred ? 'currentColor' : 'none'} />
                              </button>
                              <button
                                onClick={() => deleteEntry(entry.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'checklist' && (
            <motion.div
              key="checklist"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Add Checklist Item */}
              <Card className="mb-4 border-2 border-green-300">
                <CardContent className="pt-4 pb-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a study goal or task..."
                      value={newChecklistItem}
                      onChange={(e) => setNewChecklistItem(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addChecklistItem()}
                    />
                    <Button onClick={addChecklistItem} className="bg-green-600">
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Checklist Items */}
              <div className="space-y-2">
                {checklist.length === 0 ? (
                  <Card className="border-2 border-dashed border-gray-300">
                    <CardContent className="pt-12 pb-12 text-center text-gray-500">
                      <Check className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-lg mb-2">No tasks yet</p>
                      <p className="text-sm">Add study goals and track your progress!</p>
                    </CardContent>
                  </Card>
                ) : (
                  checklist.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <Card className={`border-2 ${item.completed ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}>
                        <CardContent className="pt-3 pb-3">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleChecklistItem(item.id)}
                              className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                                item.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                              }`}
                            >
                              {item.completed && <Check className="w-4 h-4 text-white" />}
                            </button>
                            <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                              {item.text}
                            </span>
                            <button
                              onClick={() => deleteChecklistItem(item.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'definitions' && (
            <motion.div
              key="definitions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Saved Definitions */}
              <div className="space-y-3">
                {filteredDefinitions.length === 0 ? (
                  <Card className="border-2 border-dashed border-gray-300">
                    <CardContent className="pt-12 pb-12 text-center text-gray-500">
                      <Tag className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-lg mb-2">No saved vocabulary yet</p>
                      <p className="text-sm">Save words from the dictionary to review later!</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredDefinitions.map((def) => (
                    <motion.div
                      key={def.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Card className="border-2 border-purple-200">
                        <CardContent className="pt-4 pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="text-2xl font-bold text-purple-600 mb-1">
                                <InlineFurigana word={def.word} reading={def.reading} />
                              </div>
                              <div className="text-lg text-gray-800 mb-2">{def.meaning}</div>
                              {def.example && (
                                <div className="text-sm text-gray-600 italic">"{def.example}"</div>
                              )}
                              <div className="text-xs text-gray-500 mt-2">
                                Added {new Date(def.dateAdded).toLocaleDateString()}
                              </div>
                            </div>
                            <button
                              onClick={() => deleteDefinition(def.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
