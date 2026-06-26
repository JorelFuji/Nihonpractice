# Setup Guide - Nihon Quest Full-Stack

Complete setup instructions for getting the Japanese learning platform running locally.

## Prerequisites

Before you begin, ensure you have:

- **Python 3.11+** ([Download](https://www.python.org/downloads/))
- **Node.js 18+** ([Download](https://nodejs.org/))
- **PostgreSQL 15+** ([Download](https://www.postgresql.org/download/))
- **Docker & Docker Compose** (optional, but recommended) ([Download](https://www.docker.com/))
- **OpenAI API Key** (for AI tutor) - Get from [platform.openai.com](https://platform.openai.com/)

## Quick Start with Docker (Recommended)

### 1. Clone and Configure

```bash
cd nihon-quest-fullstack
cp .env.example .env
```

Edit `.env` and add your `OPENAI_API_KEY`.

### 2. Start All Services

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database (port 5432)
- Redis cache (port 6379)
- Backend API (port 8000)
- Frontend React app (port 3000)
- VOICEVOX TTS engine (port 50021)

### 3. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

### 4. Import Dictionary Data (First Time Only)

```bash
# Download data
cd data
./download_data.sh

# Import to database
docker-compose exec backend python scripts/import_dictionary.py
```

## Manual Setup (Without Docker)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create database
createdb nihonquest

# Set environment variables
cp ../.env.example .env
# Edit .env with your settings

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload
```

Backend will be available at http://localhost:8000

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set environment variables
cp ../.env.example .env
# Make sure VITE_API_URL points to your backend

# Start development server
npm run dev
```

Frontend will be available at http://localhost:3000

### PostgreSQL Setup

```bash
# Create database and user
psql -U postgres
CREATE DATABASE nihonquest;
CREATE USER nihonquest WITH PASSWORD 'nihonquest_password';
GRANT ALL PRIVILEGES ON DATABASE nihonquest TO nihonquest;
\q
```

### VOICEVOX TTS (Optional)

For Japanese text-to-speech:

```bash
docker run -d -p 50021:50021 voicevox/voicevox_engine:cpu-ubuntu20.04-latest
```

Or download from [voicevox.hiroshiba.jp](https://voicevox.hiroshiba.jp/)

## Dictionary Data Setup

The application needs JMdict and KANJIDIC2 data to function properly.

### Download Data

```bash
cd data
mkdir -p jmdict kanjidic2 kanjivg

# JMdict (English-Japanese dictionary)
curl -o jmdict/JMdict_e.gz http://ftp.edrdg.org/pub/Nihongo/JMdict_e.gz
gunzip jmdict/JMdict_e.gz

# KANJIDIC2 (Kanji information)
curl -o kanjidic2/kanjidic2.xml.gz http://ftp.edrdg.org/pub/Nihongo/kanjidic2.xml.gz
gunzip kanjidic2/kanjidic2.xml.gz

# KanjiVG (Stroke order SVGs)
curl -Lo kanjivg/kanjivg.xml.gz https://github.com/KanjiVG/kanjivg/releases/latest/download/kanjivg.xml.gz
gunzip kanjivg/kanjivg.xml.gz

# Tatoeba sentences (optional, large file)
# curl -o tatoeba/sentences.csv http://downloads.tatoeba.org/exports/sentences.csv
```

### Import to Database

```bash
cd backend
python scripts/import_dictionary.py
```

This will parse and import:
- ~175,000 JMdict entries
- ~13,000 kanji with stroke data
- Grammar patterns (from included seed data)

**Note:** Initial import may take 10-30 minutes depending on your system.

## AI Tutor Configuration

### Option 1: OpenAI (Cloud)

1. Get API key from [platform.openai.com](https://platform.openai.com/)
2. Add to `.env`:
   ```
   OPENAI_API_KEY=sk-your-key-here
   USE_LOCAL_LLM=false
   DEFAULT_MODEL=gpt-4o-mini
   ```

**Recommended models:**
- `gpt-4o-mini` - Fast, cheap, good quality
- `gpt-4o` - Best quality, slower, more expensive
- `gpt-3.5-turbo` - Fast, cheapest, decent quality

### Option 2: Local LLM with Ollama

1. Install Ollama: [ollama.ai](https://ollama.ai/)
2. Pull a model:
   ```bash
   ollama pull qwen2.5:7b
   ```
3. Update `.env`:
   ```
   USE_LOCAL_LLM=true
   OLLAMA_URL=http://localhost:11434
   LOCAL_MODEL=qwen2.5:7b
   ```

**Recommended local models:**
- `qwen2.5:7b` - Best Japanese support
- `llama3.1:8b` - Good general performance
- `gemma2:9b` - Fast, good quality

## Testing the Setup

### Backend API

```bash
# Health check
curl http://localhost:8000/health

# Test AI tutor
curl -X POST http://localhost:8000/api/v1/tutor/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the difference between は and が?", "jlpt_level": "N5"}'
```

### Frontend

Visit http://localhost:3000 and:
1. Navigate to "AI Tutor" page
2. Ask a grammar question
3. Check that you receive a response

### Database

```bash
# Check tables were created
psql -U nihonquest -d nihonquest -c "\dt"

# Count dictionary entries
psql -U nihonquest -d nihonquest -c "SELECT COUNT(*) FROM dictionary_entries;"
```

## Troubleshooting

### Backend won't start

- Check PostgreSQL is running: `pg_isready`
- Verify database exists: `psql -l | grep nihonquest`
- Check Python version: `python --version` (must be 3.11+)

### Frontend build errors

- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### AI Tutor not responding

- Verify API key is set correctly in `.env`
- Check backend logs: `docker-compose logs backend`
- Test OpenAI directly: `curl https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY"`

### Database connection failed

- Check connection string in `.env`
- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check credentials: `psql -U nihonquest -d nihonquest`

### Docker issues

- Restart all services: `docker-compose restart`
- Rebuild containers: `docker-compose up -d --build`
- View logs: `docker-compose logs -f [service-name]`

## Development Workflow

### Backend Development

```bash
cd backend
source venv/bin/activate

# Run with auto-reload
uvicorn app.main:app --reload

# Run tests
pytest

# Create new migration
alembic revision --autogenerate -m "description"
alembic upgrade head
```

### Frontend Development

```bash
cd frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

### Database Migrations

```bash
cd backend

# Create migration
alembic revision --autogenerate -m "add new table"

# Apply migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1

# View history
alembic history
```

## Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment instructions including:
- Environment configuration
- SSL/TLS setup
- Nginx reverse proxy
- PM2 process management
- Database backups
- Monitoring setup

## Additional Resources

- **API Documentation:** http://localhost:8000/docs
- **JMdict License:** [CC BY-SA 3.0](https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project)
- **FSRS Algorithm:** [github.com/open-spaced-repetition/fsrs4anki](https://github.com/open-spaced-repetition/fsrs4anki)
- **VOICEVOX:** [voicevox.hiroshiba.jp](https://voicevox.hiroshiba.jp/)

## Getting Help

- Check existing issues: [GitHub Issues](https://github.com/yourusername/nihon-quest-fullstack/issues)
- Ask on Discord: [discord.gg/nihonquest](https://discord.gg/nihonquest)
- Read the docs: [docs.nihonquest.dev](https://docs.nihonquest.dev)

---

Made with ❤️ for Japanese learners
