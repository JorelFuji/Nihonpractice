# Changelog

All notable changes to the NihonPractice project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Audio pronunciation for vocabulary words
- User accounts with progress tracking
- Additional vocabulary categories
- Flashcard study mode
- JLPT level indicators for words

---

## [1.1.0] - 2026-07-01

### Added
- **Enhanced Memory Match Game**
  - 70+ authentic Japanese vocabulary words
  - 7 themed categories (Food, Animals, Colors, Numbers, Family, Body, Nature)
  - Random word selection algorithm for variety
  - High score tracking with localStorage
  - Win celebration modal
  - Mobile-responsive 4x4 grid layout
  - Visual emoji learning representations
  
- **Japanese Learning Rules Page**
  - 6 core learning principles in Japanese and English
  - Game-based learning methodology
  - Vocabulary categories overview
  - Study tips and techniques
  - Progress tracking guidelines
  - Beautiful gradient UI design

- **Enhanced Kids Mode**
  - Authentic hiragana display (46 characters)
  - Authentic katakana display (46 characters)
  - Numbers 1-10 in Japanese
  - 9 games with proper Japanese names
  - Rainbow gradient theme
  - Animated elements for engagement

- **Documentation**
  - BRANCHING_STRATEGY.md - Complete Git workflow guide
  - MEMORY_MATCH_ENHANCED.md - Game documentation
  - KIDS_MODE_ENHANCED.md - Kids Mode features
  - DEPLOYMENT_TEST_SUCCESS.md - Deployment verification
  - GIT_PUSH_SUCCESS_JAPANESE_LEARNING.md - Push details

### Changed
- Updated Kids Mode with authentic Japanese content
- Improved mobile responsiveness across all pages
- Enhanced visual design with gradient backgrounds
- Optimized card flip animations

### Fixed
- Japanese text rendering issues
- Mobile touch interaction bugs
- Layout overflow on small screens

---

## [1.0.0] - 2026-06-30

### Added
- **Web Games Platform**
  - Firebase Hosting deployment
  - Landing page with game selection
  - Game menu interface
  
- **Neko Othello Game**
  - Classic Othello gameplay
  - Japanese-themed design
  - Two-player mode
  
- **Shiritori Battle Game**
  - 3D arena using Three.js
  - Japanese word chain gameplay
  - Visual effects and animations
  
- **Kawaii Logic Game**
  - Puzzle-based learning
  - Logic challenges
  
- **Battle Arena**
  - Competitive gameplay
  - Japanese learning mechanics
  
- **Pet Spirit Game**
  - Virtual pet companion
  - Care and interaction system

### Infrastructure
- Firebase Hosting configuration
- Firebase project setup (nihonselfpacepractic)
- Deployment pipeline
- Git repository initialization

---

## [0.9.0] - 2026-06-29

### Added
- **Flutter Mobile App**
  - Cross-platform support (iOS/Android/Web)
  - Kids Mode screen
  - Adult Learning screen
  - Retro Games menu
  - Progress tracking service
  - Grammar screen
  - Katakana Match game
  - Memory Card game

- **React Frontend (Alternative)**
  - Character Charts (Hiragana, Katakana, Kanji)
  - Dictionary Modal with search
  - Enhanced curriculum data
  - Grammar reference system
  - Vocabulary data management

### Changed
- Reorganized project structure
- Separated Flutter and React implementations
- Improved code organization

---

## [0.8.0] - 2026-06-26

### Added
- Initial project setup
- Basic game prototypes
- Firebase configuration
- Development environment setup

### Infrastructure
- Git repository creation
- GitHub repository setup
- GitLab project (ID: 83983902)
- Initial documentation

---

## Version History Summary

| Version | Date | Key Features |
|---------|------|--------------|
| 1.1.0 | 2026-07-01 | Enhanced Memory Match, Learning Rules, Enhanced Kids Mode |
| 1.0.0 | 2026-06-30 | Web Games Platform, 5 Games, Firebase Deployment |
| 0.9.0 | 2026-06-29 | Flutter App, React Frontend, Mobile Support |
| 0.8.0 | 2026-06-26 | Initial Project Setup |

---

## Types of Changes

- **Added** - New features
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security improvements

---

## Upgrade Notes

### Upgrading to 1.1.0

1. **Memory Match Game:**
   - New vocabulary dictionary with 70+ words
   - High scores are saved locally (localStorage)
   - No migration needed - fresh start for all users

2. **Kids Mode:**
   - Enhanced with authentic Japanese content
   - Navigation updated - check new layout
   - All links point to correct destinations

3. **Learning Rules:**
   - New page added at `/japanese-learning-rules.html`
   - Accessible from Kids Mode
   - Contains learning methodology

### Breaking Changes

**None** - All changes are backward compatible

---

## Migration Guide

### From 1.0.0 to 1.1.0

No migration required. All changes are additive.

**New Files Added:**
```
public/games/memory-match/index.html
public/japanese-learning-rules.html
public/kids-mode/index.html (updated)
```

**Configuration Changes:**
None

**Database Changes:**
None (localStorage only)

---

## Known Issues

### Version 1.1.0

- **Audio:** Pronunciation audio not yet implemented (planned for 1.2.0)
- **Mobile:** Some devices may experience slight delay on card flip animations
- **Browser:** IE 11 not officially supported (use modern browsers)

### Workarounds

**Card Flip Delay on Mobile:**
- Use tap instead of long-press
- Ensure stable internet connection
- Clear browser cache if issues persist

---

## Deprecation Notices

**None** - No features are currently deprecated

---

## Feedback & Bug Reports

Found a bug or have a suggestion?

- **GitHub Issues:** https://github.com/JorelFuji/Nihonpractice/issues
- **GitLab:** Project ID 83983902
- **Discussions:** https://github.com/JorelFuji/Nihonpractice/discussions

---

## Credits

### Contributors
- **JorelFuji** - Project Lead & Developer

### Special Thanks
- Firebase team for hosting platform
- Tailwind CSS for styling utilities
- Three.js for 3D graphics
- Flutter team for mobile framework
- Open source community

---

## Links

- **Live Site:** https://nihonselfpacepractic.web.app
- **Flutter App:** https://nihonselfpacepractic-flutter.web.app
- **Repository:** https://github.com/JorelFuji/Nihonpractice
- **Documentation:** See /docs folder

---

**Last Updated:** July 1, 2026  
**Maintained By:** JorelFuji  
**Status:** Active Development
