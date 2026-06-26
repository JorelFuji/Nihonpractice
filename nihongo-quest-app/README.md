# 🌸 NihongoQuest - Full-Stack Japanese Learning Platform

A comprehensive, open-source Japanese language learning application with AI-powered tutoring, spaced repetition, handwriting practice, and gamified progression tracking.

## 🎯 Features

### Core Learning Features
- **📝 Daily Practice Sessions** - Multiple choice questions with instant feedback
- **✍️ Handwriting Practice** - Canvas-based character writing with stroke order guidance
- **📚 Curriculum Builder** - Create and manage structured learning paths (N5 → N1)
- **🗺️ Progression Roadmap** - Visual learning journey with achievement tracking
- **🎓 Lesson Management** - Detailed lesson views with video, quizzes, and practice
- **🔄 Spaced Repetition** - FSRS algorithm for optimal review scheduling
- **💬 AI Tutor (ChatGPT)** - Grammar explanations, conversation practice, instant Q&A

### Technical Features
- **🔍 Dictionary Lookup** - JMdict integration for 175k+ entries
- **📖 Sentence Examples** - Tatoeba corpus integration
- **🎌 Text Tokenization** - kuromoji.js for Japanese text parsing
- **🗣️ Text-to-Speech** - Audio pronunciation support
- **📊 Progress Analytics** - Track vocabulary, kanji, grammar mastery
- **🌙 Dark Mode** - Eye-friendly night study sessions
- **📱 Responsive Design** - Mobile-first kawaii aesthetic

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite** - Fast, modern development
- **TypeScript** - Type-safe code
- **TailwindCSS** - Utility-first styling with custom kawaii theme
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **kuromoji.js** - Japanese text tokenization
- **kuroshiro** - Furigana generation
- **ts-fsrs** - Spaced repetition scheduling

### Backend
- **FastAPI** - High-performance Python API
- **PostgreSQL** - Primary database
- **SQLAlchemy** - ORM
- **Alembic** - Database migrations
- **OpenAI API** - ChatGPT integration
- **Redis** - Caching and session management

### Data Sources (Open Source)
- **JMdict** - Japanese-English dictionary (CC BY-SA 3.0)
- **KANJIDIC2** - Kanji character database (CC BY-SA 3.0)
- **KanjiVG** - Stroke order SVG data (CC BY-SA 3.0)
- **Tatoeba** - Example sentences (CC BY 2.0)

## 📦 Installation

### Prerequisites
```bash
# Required
node >= 18.x
python >= 3.11
postgresql >= 14
redis >= 7.x

# Optional (for TTS)
docker (for VOICEVOX)
```

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/nihongo-quest-app.git
cd nihongo-quest-app
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Setup database
createdb nihongo_quest
alembic upgrade head

# Download dictionary data
python scripts/download_jmdict.py
python scripts/import_kanjidic.py

# Copy environment file
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install

# Copy environment file
cp .env.example .env.local
```

4. **Run Development Servers**
```bash
# Terminal 1 - Backend
cd backend
uvicorn app.main:app --reload --port 8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 🗂️ Project Structure

```
nihongo-quest-app/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route pages
│   │   ├── features/        # Feature modules
│   │   │   ├── practice/    # Daily practice sessions
│   │   │   ├── handwriting/ # Handwriting practice
│   │   │   ├── ai-tutor/    # ChatGPT integration
│   │   │   ├── curriculum/  # Course management
│   │   │   └── srs/         # Spaced repetition
│   │   ├── lib/             # Utilities and helpers
│   │   │   ├── fsrs.ts      # SRS algorithm
│   │   │   ├── tokenizer.ts # Japanese text parsing
│   │   │   └── dictionary.ts# Dictionary lookups
│   │   ├── store/           # Zustand stores
│   │   └── styles/          # Global styles
│   └── public/              # Static assets
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── api/             # API routes
│   │   │   ├── practice.py
│   │   │   ├── lessons.py
│   │   │   ├── ai_tutor.py
│   │   │   └── dictionary.py
│   │   ├── models/          # SQLAlchemy models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   │   ├── openai_service.py
│   │   │   ├── srs_service.py
│   │   │   └── dictionary_service.py
│   │   ├── db/              # Database utilities
│   │   └── core/            # Config and dependencies
│   ├── alembic/             # Database migrations
│   ├── scripts/             # Data import scripts
│   └── tests/               # Test suite
├── data/                    # Dictionary and learning data
│   ├── jmdict/
│   ├── kanjidic/
│   └── tatoeba/
├── docker/                  # Docker configurations
│   ├── docker-compose.yml
│   ├── Dockerfile.frontend
│   └── Dockerfile.backend
└── docs/                    # Documentation
    ├── API.md
    ├── ARCHITECTURE.md
    └── GRAMMAR_GUIDE.md
```

## 🔑 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/nihongo_quest
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=sk-your-api-key-here
SECRET_KEY=your-secret-key-for-jwt
ENVIRONMENT=development
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=NihongoQuest
```

## 🚀 Deployment

### Docker Deployment
```bash
docker-compose up -d
```

### Manual Deployment
See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions for:
- Railway / Render / Fly.io
- Vercel (frontend) + Railway (backend)
- Self-hosted VPS

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

### Data Attribution
- JMdict, KANJIDIC2, KanjiVG: CC BY-SA 3.0 (Electronic Dictionary Research and Development Group)
- Tatoeba sentences: CC BY 2.0
- VOICEVOX: Check per-character licenses for commercial use

## 🌟 Acknowledgments

- **JMdict/EDICT Project** - Jim Breen and EDRDG
- **KanjiVG Project** - Ulrich Apel
- **Tatoeba** - Community-contributed sentences
- **FSRS** - Open Spaced Repetition algorithm
- **Anki** - Inspiration for SRS implementation

## 📚 Learning Resources

Built-in grammar guides covering:
- N5-N1 JLPT grammar patterns
- Particle usage (は, が, を, に, で, etc.)
- Verb conjugations (casual, polite, honorific)
- Example sentences with furigana
- AI-powered explanations

## 🎮 Gamification

- **Daily Streaks** - Maintain study momentum
- **XP & Levels** - Progress through learner ranks
- **Achievements** - Unlock badges for milestones
- **Character Avatars** - Cute Shiba Inu mascot (Kira-chan)

## 💎 Premium Features (Optional)

- Unlimited AI tutor questions
- Advanced analytics
- Custom curriculum creation
- Priority support

## 📞 Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: support@nihongoquest.app

---

Made with 💖 for Japanese language learners worldwide

**頑張ってください！(Ganbatte kudasai! - Do your best!)**
