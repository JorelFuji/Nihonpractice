# 🎌 NihonPractice - Japanese Learning Platform

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Mobile-lightgrey.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)

**NihonPractice** is a comprehensive Japanese learning platform featuring interactive games, progressive curriculum, and engaging educational content for learners of all ages.

🌐 **Live Demo:** https://nihonselfpacepractic.web.app  
🦋 **Flutter App:** https://nihonselfpacepractic-flutter.web.app  
📚 **Project ID:** 83983902

---

## 📋 Table of Contents

- [Features](#features)
- [Games & Learning Modes](#games--learning-modes)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [License](#license)
- [Contact](#contact)

---

## ✨ Features

### 🎮 Interactive Learning Games
- **Memory Match** - Match Japanese words with visual representations (70+ vocabulary words)
- **Neko Othello** - Classic Othello with Japanese theme
- **Shiritori Battle** - 3D word chain game in Japanese
- **Kawaii Logic** - Puzzle-based learning
- **Battle Arena** - Competitive Japanese learning

### 👶 Kids Mode
- Hiragana learning (46 characters)
- Katakana practice (46 characters)
- Numbers 1-10 in Japanese
- Rainbow-themed interface
- 9 educational games

### 📚 Educational Content
- **70+ Vocabulary Words** across 7 categories:
  - 🍎 Food (たべもの)
  - 🐱 Animals (どうぶつ)
  - 🎨 Colors (いろ)
  - 🔢 Numbers (かず)
  - 👨‍👩‍👧‍👦 Family (かぞく)
  - 👁️ Body (からだ)
  - 🌸 Nature (しぜん)

### 🎯 Learning Features
- Progressive difficulty levels
- Spaced repetition system
- High score tracking
- Random word selection for variety
- Visual learning with emojis
- Mobile-responsive design
- Japanese Learning Rules methodology

---

## 🎮 Games & Learning Modes

### Memory Match Game (かるたメモリー)
Match Japanese words with their meanings through an engaging card-matching game.

**Features:**
- 8 categories (7 themed + 1 random)
- Random word selection from 70+ word dictionary
- Visual emoji representations
- High score tracking with localStorage
- Win celebration animations
- 4x4 grid layout (16 cards)

**How to Play:**
1. Select a category
2. Click cards to flip them
3. Match Japanese words with English translations
4. Complete all 8 pairs to win!

### Kids Mode (こどもモード)
Child-friendly interface with basic Japanese learning.

**Includes:**
- Character displays (Hiragana, Katakana)
- Number counting (1-10)
- Simple game selection
- Colorful, animated interface

### Other Games
- **Othello** - Strategic board game
- **Shiritori** - Japanese word chain game with 3D graphics
- **Kawaii Logic** - Puzzle challenges
- **Battle Arena** - Competitive gameplay

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript** - Interactive functionality
- **Tailwind CSS** - Utility-first styling
- **Three.js** - 3D graphics (Shiritori game)

### Mobile App
- **Flutter** - Cross-platform mobile framework
- **Dart** - Programming language
- **Firebase** - Backend services

### React Frontend (Alternative)
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Supabase** - Backend services

### Backend & Hosting
- **Firebase Hosting** - Static site hosting
- **Firebase Functions** - Serverless functions
- **Firebase Firestore** - Database
- **Firebase Authentication** - User management

### Development Tools
- **Git** - Version control
- **GitHub/GitLab** - Repository hosting
- **Firebase CLI** - Deployment tools
- **VS Code** - IDE

---

## 🚀 Getting Started

### Prerequisites

```bash
# Node.js (v16 or higher)
node --version

# npm or yarn
npm --version

# Firebase CLI
npm install -g firebase-tools

# Flutter (for mobile app)
flutter --version
```

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/JorelFuji/Nihonpractice.git
cd NihonSelfPace
```

2. **Install dependencies:**
```bash
# For web games (if using build tools)
cd firebase-hosting
npm install
```

3. **Configure Firebase:**
```bash
firebase login
firebase use nihonselfpacepractic
```

4. **Run locally:**
```bash
# Serve locally
firebase serve --only hosting

# Or use a simple HTTP server
cd firebase-hosting/public
python -m http.server 8000
```

5. **Open in browser:**
```
http://localhost:5000
# or
http://localhost:8000
```

---

## 📁 Project Structure

```
NihonSelfPace/
├── firebase-hosting/           # Web games hosting
│   ├── public/
│   │   ├── games/
│   │   │   ├── memory-match/  # Memory Match game
│   │   │   ├── othello/       # Othello game
│   │   │   ├── shiritori/     # Shiritori game
│   │   │   ├── kawaii-logic/  # Logic puzzles
│   │   │   └── battle-arena/  # Battle game
│   │   ├── kids-mode/         # Kids learning mode
│   │   ├── menu/              # Game selection
│   │   ├── index.html         # Landing page
│   │   └── japanese-learning-rules.html
│   ├── firebase.json
│   └── .firebaserc
│
├── nihon_quest_mobile/         # Flutter mobile app
│   ├── lib/
│   │   ├── screens/
│   │   ├── widgets/
│   │   └── services/
│   ├── pubspec.yaml
│   └── README.md
│
├── nihon-quest-fullstack/      # React frontend
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── data/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── backend/
│
├── docs/                       # Documentation
│   ├── BRANCHING_STRATEGY.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── MEMORY_MATCH_ENHANCED.md
│   └── KIDS_MODE_ENHANCED.md
│
├── README.md                   # This file
├── LICENSE                     # MIT License
├── CHANGELOG.md               # Version history
└── CONTRIBUTING.md            # Contribution guidelines
```

---

## 💻 Development

### Working with Feature Branches

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push -u origin feature/your-feature-name

# Create Pull Request on GitHub/GitLab
```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
perf: performance improvement
test: add tests
chore: maintenance tasks
```

### Testing Locally

```bash
# Start local development server
cd firebase-hosting
firebase serve --only hosting

# Test on mobile device (use your local IP)
# Find your IP: ifconfig (Mac/Linux) or ipconfig (Windows)
http://192.168.1.X:5000
```

---

## 🚀 Deployment

### Deploy to Firebase Hosting

```bash
# Deploy all
firebase deploy --project nihonselfpacepractic

# Deploy hosting only
firebase deploy --only hosting --project nihonselfpacepractic

# Deploy specific site
firebase deploy --only hosting:nihonselfpacepractic
```

### Environment Setup

```bash
# Set default project
firebase use nihonselfpacepractic

# View current project
firebase use

# List all projects
firebase projects:list
```

### Deployment Workflow

1. **Develop** on feature branch
2. **Test** locally with `firebase serve`
3. **Commit** changes with proper message
4. **Push** to remote repository
5. **Create PR** for code review
6. **Merge** to main after approval
7. **Deploy** to Firebase Hosting
8. **Verify** live site

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Quick Contribution Guide

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

### Development Guidelines

- Follow the branching strategy in [BRANCHING_STRATEGY.md](BRANCHING_STRATEGY.md)
- Write clear commit messages
- Test thoroughly before submitting
- Update documentation as needed
- Ensure Japanese text accuracy
- Maintain mobile responsiveness

---

## 📚 Documentation

### Available Documentation

- **[BRANCHING_STRATEGY.md](BRANCHING_STRATEGY.md)** - Git workflow and branching conventions
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute to the project
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and changes
- **[DEPLOYMENT_TEST_SUCCESS.md](DEPLOYMENT_TEST_SUCCESS.md)** - Deployment verification
- **[MEMORY_MATCH_ENHANCED.md](MEMORY_MATCH_ENHANCED.md)** - Memory Match game documentation
- **[KIDS_MODE_ENHANCED.md](KIDS_MODE_ENHANCED.md)** - Kids Mode features

### Learning Resources

- **Japanese Learning Rules:** https://nihonselfpacepractic.web.app/japanese-learning-rules.html
- **Vocabulary Categories:** 7 themed categories with 70+ words
- **Game Instructions:** Available in each game interface

---

## 📊 Project Stats

- **Commits:** 5+
- **Branches:** 4
- **Project Storage:** 3.5 MiB
- **Games:** 5+
- **Vocabulary Words:** 70+
- **Learning Categories:** 7
- **Supported Platforms:** Web, Mobile

---

## 🎯 Roadmap

### Version 1.2.0 (Planned)
- [ ] Add audio pronunciation for vocabulary
- [ ] Implement user accounts and progress tracking
- [ ] Add more vocabulary categories
- [ ] Create flashcard study mode
- [ ] Add JLPT level indicators

### Version 1.3.0 (Future)
- [ ] Multiplayer game modes
- [ ] AI-powered conversation practice
- [ ] Grammar lessons integration
- [ ] Achievement system
- [ ] Social learning features

### Version 2.0.0 (Long-term)
- [ ] Native mobile apps (iOS/Android)
- [ ] Offline mode support
- [ ] Advanced AI tutor
- [ ] Community features
- [ ] Video lessons

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Project Lead:** JorelFuji  
**Repository:** https://github.com/JorelFuji/Nihonpractice  
**GitLab Project ID:** 83983902

---

## 📞 Contact & Support

### Get Help
- **Issues:** [GitHub Issues](https://github.com/JorelFuji/Nihonpractice/issues)
- **Discussions:** [GitHub Discussions](https://github.com/JorelFuji/Nihonpractice/discussions)
- **Email:** [Contact via GitHub Profile]

### Links
- **Live Site:** https://nihonselfpacepractic.web.app
- **Flutter App:** https://nihonselfpacepractic-flutter.web.app
- **GitHub:** https://github.com/JorelFuji/Nihonpractice
- **GitLab:** Project ID 83983902

---

## 🌟 Acknowledgments

- **Tailwind CSS** - For beautiful styling utilities
- **Firebase** - For hosting and backend services
- **Three.js** - For 3D game graphics
- **Flutter** - For cross-platform mobile development
- **Google Fonts** - M PLUS Rounded 1c, Noto Sans JP
- **Open Source Community** - For inspiration and tools

---

## 🎉 Recent Updates

### Version 1.1.0 (July 2026)
- ✅ Enhanced Memory Match game with 70+ vocabulary words
- ✅ Added Japanese Learning Rules page
- ✅ Enhanced Kids Mode with authentic Japanese content
- ✅ Implemented random word selection algorithm
- ✅ Added high score tracking
- ✅ Improved mobile responsiveness
- ✅ Created comprehensive documentation

See [CHANGELOG.md](CHANGELOG.md) for complete version history.

---

## 🚀 Quick Start Commands

```bash
# Clone repository
git clone https://github.com/JorelFuji/Nihonpractice.git

# Navigate to project
cd NihonSelfPace

# Serve locally
cd firebase-hosting && firebase serve

# Deploy to production
firebase deploy --only hosting --project nihonselfpacepractic

# Create feature branch
git checkout -b feature/new-feature

# Push changes
git add . && git commit -m "feat: description" && git push
```

---

**Made with ❤️ for Japanese learners worldwide**

**がんばって！(Ganbatte! - Do your best!)** 🎌📚🎮

---

**Last Updated:** July 1, 2026  
**Version:** 1.1.0  
**Status:** Active Development
