# NihonPractice Wiki

Welcome to the **NihonPractice** Wiki! This is your comprehensive guide to understanding, developing, and contributing to the Japanese learning platform.

**Project ID:** 83983902  
**Live Site:** https://nihonselfpacepractic.web.app  
**Repository:** https://github.com/JorelFuji/Nihonpractice

---

## 📚 Wiki Contents

### Getting Started
- **[Quick Start Guide](Quick-Start-Guide)** - Get up and running in 5 minutes
- **[Installation Guide](Installation-Guide)** - Detailed setup instructions
- **[Project Overview](Project-Overview)** - Understanding the project structure
- **[Development Environment](Development-Environment)** - Setting up your dev environment

### For Users
- **[How to Play Games](How-to-Play-Games)** - Game instructions and tips
- **[Learning Path](Learning-Path)** - Recommended learning progression
- **[Vocabulary Reference](Vocabulary-Reference)** - Complete word list
- **[FAQ](FAQ)** - Frequently asked questions

### For Developers
- **[Architecture](Architecture)** - System architecture and design
- **[API Documentation](API-Documentation)** - API reference (if applicable)
- **[Code Structure](Code-Structure)** - Understanding the codebase
- **[Testing Guide](Testing-Guide)** - How to test your changes
- **[Deployment Guide](Deployment-Guide)** - Deploying to Firebase

### Contributing
- **[Contributing Guidelines](Contributing-Guidelines)** - How to contribute
- **[Branching Strategy](Branching-Strategy)** - Git workflow
- **[Code Style Guide](Code-Style-Guide)** - Coding standards
- **[Pull Request Guide](Pull-Request-Guide)** - Submitting PRs

### Games Documentation
- **[Memory Match](Memory-Match-Game)** - Memory card game details
- **[Neko Othello](Neko-Othello-Game)** - Othello game documentation
- **[Shiritori Battle](Shiritori-Battle-Game)** - Word chain game
- **[Kawaii Logic](Kawaii-Logic-Game)** - Logic puzzle game
- **[Kids Mode](Kids-Mode)** - Kids learning interface

### Technical Documentation
- **[Firebase Setup](Firebase-Setup)** - Firebase configuration
- **[Flutter App](Flutter-App)** - Mobile app documentation
- **[React Frontend](React-Frontend)** - React implementation
- **[CI/CD Pipeline](CI-CD-Pipeline)** - Continuous integration

### Resources
- **[Learning Resources](Learning-Resources)** - External learning materials
- **[Troubleshooting](Troubleshooting)** - Common issues and solutions
- **[Changelog](Changelog)** - Version history
- **[Roadmap](Roadmap)** - Future plans

---

## 🚀 Quick Links

### Essential Pages
- 📖 [README](../README.md)
- 🤝 [CONTRIBUTING](../CONTRIBUTING.md)
- 📝 [CHANGELOG](../CHANGELOG.md)
- 🌳 [BRANCHING_STRATEGY](../BRANCHING_STRATEGY.md)
- ⚖️ [LICENSE](../LICENSE)

### Live Applications
- 🌐 [Web App](https://nihonselfpacepractic.web.app)
- 📱 [Flutter App](https://nihonselfpacepractic-flutter.web.app)
- 🎮 [Memory Match Game](https://nihonselfpacepractic.web.app/games/memory-match/)
- 👶 [Kids Mode](https://nihonselfpacepractic.web.app/kids-mode)

---

## 📖 Quick Start

### For Players
1. Visit https://nihonselfpacepractic.web.app
2. Click "🕹️ Play Games"
3. Choose a game
4. Start learning Japanese!

### For Developers
```bash
# Clone repository
git clone https://github.com/JorelFuji/Nihonpractice.git
cd NihonSelfPace

# Serve locally
cd firebase-hosting
firebase serve

# Open browser
http://localhost:5000
```

---

## 🎮 Games Overview

### Memory Match (かるたメモリー)
**Description:** Match Japanese words with their meanings through visual cards.

**Features:**
- 70+ vocabulary words
- 7 categories + Random mode
- High score tracking
- Visual emoji learning

**How to Play:**
1. Select a category
2. Click cards to flip
3. Match Japanese word with translation
4. Complete all 8 pairs!

[**Read full documentation →**](Memory-Match-Game)

---

### Neko Othello (ねこオセロ)
**Description:** Classic Othello strategy game with cute cat theme.

**Features:**
- Two-player mode
- AI opponent (coming soon)
- Japanese interface

**How to Play:**
1. Click to place piece
2. Flip opponent's pieces
3. Most pieces wins!

[**Read full documentation →**](Neko-Othello-Game)

---

### Shiritori Battle (しりとりバトル)
**Description:** Japanese word chain game in immersive 3D environment.

**Features:**
- 3D graphics with Three.js
- Word chain rules
- Battle mechanics

**How to Play:**
1. Say word starting with last character
2. No repeated words
3. Keep the chain going!

[**Read full documentation →**](Shiritori-Battle-Game)

---

## 📚 Learning Resources

### Vocabulary Categories

#### 🍎 Food (たべもの)
- りんご (ringo) - apple 🍎
- バナナ (banana) - banana 🍌
- いちご (ichigo) - strawberry 🍓
- [See complete list →](Vocabulary-Reference#food)

#### 🐱 Animals (どうぶつ)
- ねこ (neko) - cat 🐱
- いぬ (inu) - dog 🐕
- とり (tori) - bird 🐦
- [See complete list →](Vocabulary-Reference#animals)

#### 🎨 Colors (いろ)
- あか (aka) - red 🔴
- あお (ao) - blue 🔵
- きいろ (kiiro) - yellow 🟡
- [See complete list →](Vocabulary-Reference#colors)

[**View all 7 categories →**](Vocabulary-Reference)

---

## 🛠️ Development

### Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript, Tailwind CSS
- **Mobile:** Flutter, Dart
- **Backend:** Firebase (Hosting, Firestore, Functions)
- **Graphics:** Three.js (3D games)
- **Build:** Vite, npm
- **CI/CD:** GitLab CI, GitHub Actions

### Project Structure
```
NihonSelfPace/
├── firebase-hosting/      # Web games
├── nihon_quest_mobile/    # Flutter app
├── nihon-quest-fullstack/ # React frontend
└── docs/                  # Documentation
```

[**Read full architecture →**](Architecture)

---

## 🤝 Contributing

We welcome contributions!

### Ways to Contribute
- 🐛 Report bugs
- ✨ Suggest features
- 📝 Improve documentation
- 🎨 Enhance UI/UX
- 🌐 Verify Japanese accuracy
- 🧪 Add tests

### Getting Started
1. Read [Contributing Guidelines](../CONTRIBUTING.md)
2. Fork the repository
3. Create feature branch
4. Make changes
5. Submit pull request

[**Read full guide →**](Contributing-Guidelines)

---

## 📊 Project Statistics

- **Version:** 1.1.0
- **Commits:** 5+
- **Branches:** 4
- **Games:** 5+
- **Vocabulary Words:** 70+
- **Categories:** 7
- **Project Storage:** 3.5 MiB

---

## 🔧 Troubleshooting

### Common Issues

**Q: Games not loading?**
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Check internet connection
- Try different browser

**Q: Japanese text not displaying?**
- Ensure browser supports UTF-8
- Install Japanese fonts if needed
- Check character encoding

**Q: Mobile app issues?**
- Update to latest version
- Clear app cache
- Reinstall if necessary

[**See full troubleshooting guide →**](Troubleshooting)

---

## 📞 Support & Contact

### Get Help
- 🐛 [GitHub Issues](https://github.com/JorelFuji/Nihonpractice/issues) - Bug reports
- 💬 [GitHub Discussions](https://github.com/JorelFuji/Nihonpractice/discussions) - Questions
- 📧 [Email](mailto:contact@example.com) - Direct contact

### Community
- 🌟 Star the project on GitHub
- 👀 Watch for updates
- 🍴 Fork to contribute

---

## 🗺️ Roadmap

### Version 1.2.0 (Next Release)
- [ ] Audio pronunciation for vocabulary
- [ ] User accounts and progress tracking
- [ ] More vocabulary categories
- [ ] Flashcard study mode
- [ ] JLPT level indicators

### Version 2.0.0 (Future)
- [ ] Native mobile apps
- [ ] Offline mode
- [ ] AI conversation practice
- [ ] Community features
- [ ] Video lessons

[**See full roadmap →**](Roadmap)

---

## 📝 Recent Updates

### July 2026 - Version 1.1.0
- ✅ Enhanced Memory Match with 70+ words
- ✅ Japanese Learning Rules page
- ✅ Enhanced Kids Mode
- ✅ Random word selection
- ✅ High score tracking
- ✅ Mobile responsiveness

[**See full changelog →**](../CHANGELOG.md)

---

## 📖 Documentation Index

### Getting Started
- [Quick Start](Quick-Start-Guide)
- [Installation](Installation-Guide)
- [First Steps](First-Steps)

### User Guides
- [Playing Games](How-to-Play-Games)
- [Learning Path](Learning-Path)
- [Tips & Tricks](Tips-and-Tricks)

### Developer Guides
- [Setup Development](Development-Environment)
- [Code Structure](Code-Structure)
- [API Reference](API-Documentation)
- [Testing](Testing-Guide)
- [Deployment](Deployment-Guide)

### Game Documentation
- [Memory Match](Memory-Match-Game)
- [Othello](Neko-Othello-Game)
- [Shiritori](Shiritori-Battle-Game)
- [All Games](Games-Overview)

### Reference
- [Vocabulary List](Vocabulary-Reference)
- [Grammar Rules](Grammar-Reference)
- [Hiragana Chart](Hiragana-Chart)
- [Katakana Chart](Katakana-Chart)

---

## 🎯 About This Wiki

This wiki is maintained by the NihonPractice community. It's a living document that evolves with the project.

### How to Edit
1. Fork the repository
2. Edit wiki pages
3. Submit pull request
4. Changes reviewed by maintainers

### Wiki Guidelines
- Keep pages concise and focused
- Use clear headings and structure
- Include code examples
- Add screenshots when helpful
- Link to related pages
- Update table of contents

---

## ⚖️ License

NihonPractice is open source software licensed under the [MIT License](../LICENSE).

---

## 🙏 Acknowledgments

Special thanks to:
- Firebase team
- Tailwind CSS
- Three.js community
- Flutter team
- All contributors

---

## 📌 Navigation

**Main:** [Home](Wiki-Home) | [About](About) | [FAQ](FAQ) | [Contact](Contact)

**Users:** [Games](Games-Overview) | [Learning](Learning-Path) | [Vocabulary](Vocabulary-Reference)

**Developers:** [Setup](Development-Environment) | [Code](Code-Structure) | [Deploy](Deployment-Guide)

**Contributing:** [Guidelines](Contributing-Guidelines) | [Style Guide](Code-Style-Guide) | [PRs](Pull-Request-Guide)

---

**Last Updated:** July 1, 2026  
**Wiki Version:** 1.0  
**Maintained By:** NihonPractice Community

**がんばって！(Ganbatte! - Do your best!)** 🎌📚🎮
