# Nihon Quest - Project Summary

## Overview

**Nihon Quest** is a comprehensive, full-stack Japanese language learning platform that combines proven educational methodologies with modern AI technology. Built from the ground up to consolidate and enhance existing HTML prototypes from the `stitch_nihongo_quest` folders, this application provides a complete learning ecosystem from N5 (beginner) to N1 (advanced) JLPT levels.

## Core Features Implemented

### 1. **AI-Powered Tutoring System** 🤖
- **ChatGPT/OpenAI Integration**: Ask grammar questions, get detailed explanations with examples
- **Local LLM Support**: Run offline with Ollama (Qwen2.5, Llama3.1, Gemma2)
- **Conversation Practice**: Natural Japanese dialogue with instant feedback
- **Writing Correction**: Submit Japanese text and receive constructive corrections
- **Kanji Explanations**: On-demand kanji breakdowns with mnemonics

**API Endpoints:**
- `POST /api/v1/tutor/ask` - Grammar questions
- `POST /api/v1/tutor/conversation` - Conversation practice
- `POST /api/v1/tutor/correct` - Writing correction
- `POST /api/v1/tutor/explain-kanji` - Kanji explanations
- `POST /api/v1/tutor/generate-sentences` - Practice sentence generation

### 2. **Spaced Repetition System (SRS)** 📚
- **FSRS Algorithm**: State-of-the-art spaced repetition (same as Anki 24.x+)
- **Adaptive Scheduling**: Cards scheduled based on difficulty and stability
- **Multiple Card Types**: Vocabulary, kanji, grammar, sentences
- **Review Analytics**: Track retention rate, average rating, review history
- **Forecast**: See upcoming review load for the next 7+ days

**API Endpoints:**
- `GET /api/v1/srs/reviews/due` - Get cards due for review
- `POST /api/v1/srs/reviews/answer` - Submit review (1=Again, 2=Hard, 3=Good, 4=Easy)
- `GET /api/v1/srs/stats` - Get user SRS statistics
- `GET /api/v1/srs/forecast` - View upcoming review schedule

### 3. **Dictionary & Vocabulary** 📖
- **JMdict Integration**: 175,000+ Japanese-English entries
- **KANJIDIC2**: 13,000 kanji with meanings, readings, stroke counts
- **KanjiVG**: SVG stroke order data for all kanji
- **Furigana Support**: Automatic furigana generation (kuromoji.js integration planned)
- **Search**: Search by kanji, reading, romaji, or English
- **JLPT Filtering**: Filter vocabulary by JLPT level (N5-N1)

**API Endpoints:**
- `GET /api/v1/vocab/search?q={query}` - Search dictionary
- `GET /api/v1/vocab/word/{id}` - Get word details
- `GET /api/v1/vocab/kanji/{character}` - Get kanji details

### 4. **Structured Lessons** 🎓
- **JLPT-Aligned Curriculum**: Lessons organized by level (N5-N1)
- **Progress Tracking**: Track completion and scores for each lesson
- **Multi-Modal Content**: Video, text, quizzes, practice exercises
- **Gamification**: EXP points, gems, achievements

**API Endpoints:**
- `GET /api/v1/lessons` - List all published lessons
- `GET /api/v1/lessons/{id}` - Get lesson details
- `POST /api/v1/lessons/{id}/complete` - Mark lesson complete

### 5. **Practice Modes** ✍️
- **Handwriting Recognition**: Canvas-based kanji/kana writing practice
- **Speech Evaluation**: Pronunciation practice with Whisper STT
- **Multiple Choice**: Interactive quizzes with instant feedback
- **Sentence Construction**: Build sentences from word banks

**API Endpoints:**
- `POST /api/v1/practice/handwriting/check` - Check handwriting
- `POST /api/v1/practice/speech/evaluate` - Evaluate pronunciation

### 6. **User Progress & Gamification** 🏆
- **Streak Tracking**: Daily practice streaks
- **EXP System**: Earn experience points for completing activities
- **Achievement System**: Unlock badges for milestones
- **Hearts/Gems**: In-app currency and lives system
- **Leaderboards**: (Planned) Compete with other learners

## Technology Stack

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL 15+
- **ORM**: SQLAlchemy 2.0
- **Cache**: Redis (optional)
- **AI**: OpenAI API / Ollama (local LLM)
- **SRS**: FSRS (Python implementation)
- **TTS**: VOICEVOX
- **STT**: OpenAI Whisper

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + Custom Kawaii Design System
- **Routing**: React Router v6
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Japanese Processing**: kuromoji.js + kuroshiro
- **SRS**: ts-fsrs
- **Icons**: Lucide React
- **Animations**: Framer Motion

### DevOps
- **Containerization**: Docker + Docker Compose
- **Database Migrations**: Alembic
- **API Documentation**: OpenAPI (Swagger) via FastAPI
- **Environment**: .env configuration

## Database Schema

### Key Tables
- **users** - User accounts, progress, streaks, currency
- **dictionary_entries** - JMdict vocabulary data
- **kanji_entries** - KANJIDIC2 kanji data with stroke order
- **grammar_patterns** - JLPT grammar patterns with examples
- **lessons** - Structured lesson content
- **cards** - SRS flashcards linked to vocab/kanji/grammar
- **reviews** - Review history with FSRS parameters
- **achievements** - Unlockable achievement definitions
- **conversation_messages** - AI tutor conversation history
- **handwriting_submissions** - Handwriting practice data
- **speech_submissions** - Pronunciation practice data

## Open-Source Integrations

### Dictionary Data
- **JMdict** (CC BY-SA 3.0) - Japanese-multilingual dictionary
- **KANJIDIC2** (CC BY-SA 3.0) - Kanji information database
- **KanjiVG** (CC BY-SA 3.0) - Kanji stroke order SVGs
- **Tatoeba** (CC BY 2.0) - Example sentences corpus

### Libraries & Tools
- **FSRS** (MIT) - Free Spaced Repetition Scheduler
- **kuromoji.js** (Apache 2.0) - Japanese morphological analyzer
- **kuroshiro** (MIT) - Furigana and romaji conversion
- **VOICEVOX** (Open source, attribution required) - Japanese TTS
- **Whisper** (MIT) - Speech recognition

## Design System: "Kawaii Nihongo"

The UI follows a custom design system inspired by Japanese mobile games:

### Colors
- **Primary (Sakura Pink)**: `#9c3f59` - Main actions, branding
- **Secondary (Mint Green)**: `#006c52` - Success states, correct answers
- **Tertiary (Sky Blue)**: `#0d6683` - Information, passive elements
- **Background**: `#f7f9ff` - Soft off-white with pink tint

### Typography
- **Font**: Quicksand (rounded, friendly)
- **Weights**: 300-700 for hierarchy
- **Japanese**: Zen Maru Gothic recommended for consistency

### Components
- **Rounded Corners**: All elements use 1rem+ border radius
- **Tactile Buttons**: Bottom border creates "press down" effect
- **Pill Shapes**: Progress bars, badges, tags
- **Soft Shadows**: Low-opacity primary-colored shadows
- **Bounce Animations**: Playful micro-interactions

## Project Structure

```
nihon-quest-fullstack/
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/    # API route handlers
│   │   ├── core/                # Config, security
│   │   ├── models/              # SQLAlchemy models
│   │   ├── services/            # Business logic (AI, SRS)
│   │   └── main.py              # FastAPI app entry
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Route pages
│   │   ├── services/            # API clients
│   │   └── App.tsx              # Main app component
│   ├── package.json
│   └── Dockerfile
├── data/                         # Dictionary and kanji data
├── docker-compose.yml            # Multi-container orchestration
├── .env.example                  # Environment template
├── README.md                     # Project README
├── SETUP.md                      # Detailed setup guide
└── PROJECT_SUMMARY.md            # This file
```

## Getting Started

### Quick Start (Docker)
```bash
# Clone repository
cd nihon-quest-fullstack

# Copy environment file
cp .env.example .env
# Add your OPENAI_API_KEY to .env

# Start all services
docker-compose up -d

# Access the app
open http://localhost:3000
```

### Manual Setup
See [SETUP.md](SETUP.md) for detailed manual installation instructions.

## API Examples

### Ask Grammar Question
```bash
curl -X POST http://localhost:8000/api/v1/tutor/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is the difference between は and が?",
    "jlpt_level": "N5"
  }'
```

### Get Due Reviews
```bash
curl http://localhost:8000/api/v1/srs/reviews/due?user_id=1&limit=20
```

### Submit Review
```bash
curl -X POST http://localhost:8000/api/v1/srs/reviews/answer?user_id=1 \
  -H "Content-Type: application/json" \
  -d '{
    "card_id": 123,
    "rating": 3,
    "duration_ms": 8500
  }'
```

### Search Dictionary
```bash
curl http://localhost:8000/api/v1/vocab/search?q=食べる
```

## Key Differentiators

### 1. **AI Tutor Integration**
Unlike static learning apps, Nihon Quest provides a conversational AI tutor that can:
- Answer nuanced grammar questions in real-time
- Generate custom practice exercises on demand
- Provide personalized feedback on writing
- Adapt explanations to your JLPT level

### 2. **FSRS Algorithm**
Uses the cutting-edge FSRS spaced repetition algorithm (same as Anki 24.x+), which:
- Outperforms traditional SM-2 algorithm
- Adapts to individual learning patterns
- Provides more accurate scheduling
- Backed by academic research

### 3. **Fully Open-Source Stack**
All core components use open-source tools:
- No vendor lock-in
- Full data portability
- Transparent algorithms
- Community-driven development

### 4. **Privacy-First Design**
- Optional local LLM support (no cloud dependency)
- Self-hostable
- No telemetry or tracking
- Your data stays yours

## Future Roadmap

### Phase 1: MVP (Current)
- [x] AI tutor (grammar, conversation, correction)
- [x] SRS flashcard system
- [x] Dictionary integration
- [x] Basic lessons
- [x] User authentication
- [ ] Complete data import scripts

### Phase 2: Enhanced Learning
- [ ] Reading practice with pop-up dictionary
- [ ] Real handwriting recognition (ML model)
- [ ] Pronunciation scoring (Whisper + alignment)
- [ ] Kanji writing animations
- [ ] Grammar pattern drills

### Phase 3: Social & Community
- [ ] Study groups
- [ ] Shared decks
- [ ] Leaderboards
- [ ] Achievement sharing
- [ ] Native speaker chat matching

### Phase 4: Advanced Features
- [ ] Personalized learning paths
- [ ] Anki deck import/export
- [ ] Mobile apps (React Native)
- [ ] Offline mode
- [ ] Video lessons with subtitle support

## Contributing

Contributions are welcome! Key areas:

- **Dictionary data**: Improve JMdict import, add context examples
- **UI/UX**: Enhance kawaii design, add animations
- **ML models**: Better handwriting/speech recognition
- **Lessons**: Create JLPT-aligned content
- **Translations**: Multi-language support

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

- **Application code**: MIT License
- **Dictionary data (JMdict, KANJIDIC2, KanjiVG)**: CC BY-SA 3.0 (requires attribution)
- **Tatoeba sentences**: CC BY 2.0
- **FSRS algorithm**: MIT License
- **VOICEVOX**: Open-source with attribution requirement

## Acknowledgments

This project builds on the shoulders of giants:

- **Jim Breen** and the EDRDG team for JMdict/KANJIDIC2
- **Ulrich Apel** for KanjiVG stroke order data
- **Tatoeba.org** community for example sentences
- **Open Spaced Repetition** project for FSRS
- **VOICEVOX** team for high-quality Japanese TTS
- **OpenAI** for Whisper and GPT models

## Resources

- **Documentation**: [docs.nihonquest.dev](https://docs.nihonquest.dev)
- **API Reference**: http://localhost:8000/docs (when running)
- **Discord Community**: [discord.gg/nihonquest](https://discord.gg/nihonquest)
- **GitHub Repository**: [github.com/yourusername/nihon-quest-fullstack](https://github.com/yourusername/nihon-quest-fullstack)

---

Built with ❤️ for Japanese language learners worldwide.
