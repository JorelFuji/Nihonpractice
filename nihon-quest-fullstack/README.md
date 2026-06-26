# Nihon Quest - Full-Stack Japanese Learning Platform

A comprehensive, open-source Japanese language learning application with AI-powered tutoring, spaced repetition, and gamified learning experiences.

## 🎯 Features

### Core Learning Features
- **Adaptive Spaced Repetition** - FSRS-powered SRS system
- **Multi-Modal Practice** - Reading, writing, listening, speaking
- **Handwriting Recognition** - Canvas-based kanji/kana practice
- **AI Tutor** - ChatGPT/LLM-powered grammar explanations and conversation practice
- **Progress Tracking** - Gamified stats, streaks, and achievements
- **N5-N1 Curriculum** - Structured lessons following JLPT levels

### Technical Features
- **Dictionary** - JMdict integration (~175k entries)
- **Kanji Database** - KANJIDIC2 with stroke order (KanjiVG)
- **Tokenization** - kuromoji.js for Japanese text parsing
- **TTS** - VOICEVOX for natural Japanese pronunciation
- **STT** - Whisper for speaking practice evaluation
- **Example Sentences** - Tatoeba corpus integration

## 🏗️ Architecture

```
Frontend:  React + Vite + TypeScript + TailwindCSS
Backend:   FastAPI (Python)
Database:  PostgreSQL
Cache:     Redis (optional)
AI:        OpenAI API / Ollama (local LLM)
```

## 📁 Project Structure

```
nihon-quest-fullstack/
├── backend/               # FastAPI application
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── core/         # Config, security
│   │   ├── models/       # Database models
│   │   ├── schemas/      # Pydantic schemas
│   │   ├── services/     # Business logic
│   │   └── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/             # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── data/                 # Dictionary and kanji data
│   ├── jmdict/
│   ├── kanjidic2/
│   └── kanjivg/
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Docker (optional)

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Setup database
createdb nihonquest
alembic upgrade head

# Run server
uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Docker (Recommended)

```bash
docker-compose up -d
```

## 📚 Data Setup

Download and prepare dictionary data:

```bash
# JMdict (English-Japanese dictionary)
curl -O http://ftp.edrdg.org/pub/Nihongo/JMdict_e.gz
gunzip JMdict_e.gz

# KANJIDIC2 (Kanji information)
curl -O http://ftp.edrdg.org/pub/Nihongo/kanjidic2.xml.gz
gunzip kanjidic2.xml.gz

# KanjiVG (Stroke order SVGs)
curl -LO https://github.com/KanjiVG/kanjivg/releases/latest/download/kanjivg.xml.gz
gunzip kanjivg.xml.gz

# Import to database
python backend/scripts/import_dictionary.py
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Vocabulary
- `GET /api/vocab/search` - Search dictionary
- `GET /api/vocab/word/{id}` - Get word details
- `POST /api/vocab/save` - Save word to user deck

### SRS (Spaced Repetition)
- `GET /api/srs/reviews/due` - Get due reviews
- `POST /api/srs/reviews/answer` - Submit review answer
- `GET /api/srs/stats` - Get user SRS statistics

### Lessons
- `GET /api/lessons` - List all lessons
- `GET /api/lessons/{id}` - Get lesson details
- `POST /api/lessons/{id}/complete` - Mark lesson complete

### AI Tutor
- `POST /api/tutor/ask` - Ask grammar question
- `POST /api/tutor/conversation` - Practice conversation
- `POST /api/tutor/correction` - Get writing correction

### Practice
- `POST /api/practice/handwriting/check` - Check handwriting
- `POST /api/practice/speech/evaluate` - Evaluate pronunciation

## 🎨 Design System

The app uses the **Kawaii Nihongo** design system:
- **Primary:** Sakura Pink (#9c3f59)
- **Secondary:** Mint Green (#006c52)
- **Tertiary:** Sky Blue (#0d6683)
- **Font:** Quicksand (rounded, friendly)

## 🔧 Configuration

### Environment Variables

Create `.env` files in both `backend/` and `frontend/`:

**backend/.env:**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/nihonquest
SECRET_KEY=your-secret-key-here
OPENAI_API_KEY=sk-...
VOICEVOX_URL=http://localhost:50021
REDIS_URL=redis://localhost:6379
```

**frontend/.env:**
```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws
```

## 📖 Learning Path

### Beginner (N5-N4)
1. Hiragana/Katakana mastery
2. Basic particles and sentence structure
3. Essential vocabulary (~1,500 words)
4. Simple daily conversation

### Intermediate (N3)
1. Passive, causative forms
2. Complex sentence patterns
3. Keigo basics
4. Reading practice with native materials

### Advanced (N2-N1)
1. Formal/written language
2. Literary grammar patterns
3. Business Japanese
4. News and academic reading

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project uses multiple open-source components:

- **Application Code:** MIT License
- **JMdict/KANJIDIC2:** CC BY-SA 3.0 (requires attribution)
- **KanjiVG:** CC BY-SA 3.0
- **Tatoeba Sentences:** CC BY 2.0
- **FSRS:** MIT License
- **kuromoji.js:** Apache 2.0

See [LICENSE.md](LICENSE.md) for full details.

## 🙏 Acknowledgments

- **JMdict/KANJIDIC2** - Electronic Dictionary Research and Development Group
- **KanjiVG** - Ulrich Apel
- **Tatoeba** - Tatoeba.org community
- **FSRS** - Open Spaced Repetition community
- **VOICEVOX** - Hiroshiba Kazuyuki

## 📞 Support

- Documentation: [docs.nihonquest.dev](https://docs.nihonquest.dev)
- Discord: [discord.gg/nihonquest](https://discord.gg/nihonquest)
- Issues: [GitHub Issues](https://github.com/yourusername/nihon-quest-fullstack/issues)

---

Made with ❤️ for Japanese learners worldwide
