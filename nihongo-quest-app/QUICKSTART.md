# 🚀 Quick Start Guide

Get NihongoQuest running on your machine in 5 minutes!

## Prerequisites

Make sure you have these installed:
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.11+ ([Download](https://www.python.org/downloads/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **Redis** 7+ ([Download](https://redis.io/download))
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

## Option 1: Docker Setup (Recommended) 🐳

The easiest way to get started:

```bash
# 1. Clone the repository
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihongo-quest-app

# 2. Create .env file
cat > .env << 'EOF'
OPENAI_API_KEY=sk-your-api-key-here
SECRET_KEY=your-secret-key-change-in-production
EOF

# 3. Start all services
docker-compose up -d

# 4. Wait for services to be ready (30-60 seconds)
docker-compose logs -f

# 5. Open your browser
open http://localhost:5173
```

That's it! The app should now be running at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Option 2: Manual Setup 🛠️

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and add your OpenAI API key
# Use your favorite editor (nano, vim, code, etc.)
nano .env
```

Your `.env` should look like:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/nihongo_quest
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=sk-your-actual-api-key-here
SECRET_KEY=generate-a-random-secret-key
```

```bash
# Create the database
createdb nihongo_quest

# Or using psql
psql -U postgres
CREATE DATABASE nihongo_quest;
\q

# Start the backend server
uvicorn app.main:app --reload --port 8000
```

### Step 2: Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Start the development server
npm run dev
```

## Step 3: Test the Application

1. **Open your browser** to http://localhost:5173
2. **Explore the homepage** - You should see your dashboard
3. **Try the AI Tutor** - Click on "AI Tutor" and ask a question like:
   - "Explain the difference between は and が"
   - "How do I say 'I want to learn Japanese'?"
4. **Practice Session** - Go to "Study" and answer some practice questions
5. **Handwriting Practice** - Try writing hiragana characters

## Troubleshooting 🔧

### Backend won't start

**Database connection error?**
```bash
# Make sure PostgreSQL is running
pg_isready -U postgres

# If not running, start it:
# macOS (Homebrew)
brew services start postgresql@14

# Linux
sudo systemctl start postgresql

# Windows
# Use PostgreSQL service manager
```

**Redis connection error?**
```bash
# Make sure Redis is running
redis-cli ping

# If not running, start it:
# macOS
brew services start redis

# Linux
sudo systemctl start redis

# Windows
# Use Redis service manager or WSL
```

**OpenAI API error?**
- Check that your API key is valid at https://platform.openai.com/api-keys
- Make sure you have billing enabled
- Check your API usage limits

### Frontend won't start

**Port 5173 already in use?**
```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

**Module not found errors?**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS errors

Make sure your backend `.env` has the frontend URL:
```env
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

## Next Steps 🎯

1. **Explore Features**
   - Try all the practice modes
   - Chat with the AI tutor
   - Track your progress

2. **Customize Your Learning**
   - Set your JLPT level (N5-N1)
   - Create custom study sessions
   - Build your own curriculum

3. **Add Real Data**
   - Download JMdict dictionary data (instructions in README.md)
   - Import Tatoeba example sentences
   - Load KanjiVG stroke order data

4. **Deploy** (Optional)
   - See DEPLOYMENT.md for production setup
   - Deploy frontend to Vercel
   - Deploy backend to Railway or Render

## Common Commands

```bash
# Backend
uvicorn app.main:app --reload                # Start with hot reload
uvicorn app.main:app --reload --port 8001   # Use different port
python -m pytest                              # Run tests

# Frontend
npm run dev                                   # Start dev server
npm run build                                 # Build for production
npm run preview                               # Preview production build
npm run lint                                  # Lint code

# Docker
docker-compose up                             # Start all services
docker-compose up -d                          # Start in background
docker-compose down                           # Stop all services
docker-compose logs -f backend                # View backend logs
docker-compose exec backend python            # Access Python shell
docker-compose exec postgres psql -U postgres # Access database
```

## Need Help? 💬

- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions and share tips
- **API Documentation**: http://localhost:8000/docs

---

## Quick Test Checklist ✅

After setup, verify everything works:

- [ ] Homepage loads at http://localhost:5173
- [ ] Backend health check: http://localhost:8000/health
- [ ] API docs accessible: http://localhost:8000/docs
- [ ] Can ask AI tutor a question
- [ ] Practice questions load and work
- [ ] Handwriting canvas draws smoothly
- [ ] Progress tracking updates correctly

**All green?** You're ready to start learning Japanese! 🎌

がんばってください！(Ganbatte kudasai - Do your best!)
