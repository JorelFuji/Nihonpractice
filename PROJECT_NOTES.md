# 📝 Project Notes - Nihon Quest

## 🎯 **Project Overview**

**Nihon Quest** is a comprehensive Japanese learning platform with:
- Web application (React + Firebase)
- Mobile games (Flutter)
- Educational games for kids and adults
- Grammar roadmap (N5-N1)
- Interactive learning modules

---

## 📊 **Current Status**

### **✅ Completed**

#### **Web Application**
- ✅ Grammar Roadmap (N5-N1)
- ✅ Learning modules with bilingual content
- ✅ Hiragana/Katakana charts
- ✅ SOV sentence practice
- ✅ Particles module
- ✅ Study timeline
- ✅ Responsive design
- ✅ Scrolling improvements (mobile + web)
- ✅ Firebase deployment

#### **DevOps & Tooling**
- ✅ Linting (ESLint + Prettier)
- ✅ TypeScript type checking
- ✅ Automated deployment scripts
- ✅ Health monitoring system
- ✅ Firebase Cloud Functions
- ✅ Cron jobs (6 scheduled tasks)
- ✅ CI/CD workflows (GitHub Actions)
- ✅ Makefile for quick commands
- ✅ Setup automation script

#### **Game Plans**
- ✅ Pokemon Soccer Learning Game (design complete)
- ✅ Stickman Japanese Game (design complete)
- ✅ NihonCraft Kids (Minecraft-style, design complete)
- ✅ Arcade games scaffolding (Flutter mobile)

---

## 🚧 **In Progress**

### **Current Branch: `scrolling-improvements-and-games`**

**Recent Changes:**
- Scrolling improvements for mobile/web
- DevOps tooling setup
- Firebase Functions for cron jobs
- Health monitoring system
- CI/CD automation

**Next Steps:**
1. Test deployment with new tooling
2. Verify health check endpoint
3. Test cron jobs in production
4. Merge to main after testing

---

## 📅 **Roadmap**

### **Phase 1: Infrastructure (Current)**
- [x] DevOps tooling
- [x] CI/CD setup
- [x] Health monitoring
- [x] Cron jobs
- [ ] Test in production
- [ ] Documentation review

### **Phase 2: Game Implementation**
- [ ] Choose first game to implement
- [ ] Set up Flutter project structure
- [ ] Implement core game mechanics
- [ ] Add multilingual support
- [ ] Firebase integration
- [ ] Testing and deployment

### **Phase 3: Mobile App**
- [ ] Complete arcade games
- [ ] Add Pokemon-style game
- [ ] Add Stickman game
- [ ] Parent-child co-op features
- [ ] Progress syncing with web

### **Phase 4: Advanced Features**
- [ ] AI tutor improvements
- [ ] Voice recognition
- [ ] Conversation practice
- [ ] Multiplayer features
- [ ] Social learning features

---

## 🎮 **Game Development Priority**

### **Recommended Order:**

1. **Kanji Pong** (Simplest)
   - Already scaffolded
   - Good for testing multilingual system
   - Quick win

2. **Pokemon Soccer Learning Game**
   - High engagement potential
   - Comprehensive learning
   - Appeals to kids and adults

3. **Stickman Japanese Game**
   - Action-packed
   - Fast-paced learning
   - Good for retention

4. **NihonCraft Kids**
   - Most complex
   - Requires 3D engine
   - Long-term project

---

## 🔧 **Technical Decisions**

### **Tech Stack**
- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Backend:** Firebase (Firestore, Functions, Hosting)
- **Mobile:** Flutter + Flame
- **CI/CD:** GitHub Actions
- **Monitoring:** Custom health checks + Firebase logs

### **Architecture Decisions**

#### **Why Firebase?**
- ✅ Real-time database
- ✅ Easy authentication
- ✅ Serverless functions
- ✅ Free tier sufficient
- ✅ Good mobile SDK

#### **Why Flutter for Games?**
- ✅ Cross-platform (iOS + Android)
- ✅ Flame game engine
- ✅ Good performance
- ✅ Hot reload
- ✅ Single codebase

#### **Why Makefile?**
- ✅ Simple command interface
- ✅ Cross-platform
- ✅ Self-documenting
- ✅ Easy to extend

---

## 📝 **Development Notes**

### **Scrolling Improvements**
**Problem:** Content overflowing on mobile devices
**Solution:** 
- Added `overflow-x: hidden` globally
- Enabled `overflow-y: auto` for scrollable content
- Added `-webkit-overflow-scrolling: touch` for iOS
- Custom scrollbar styling for desktop

**Files Modified:**
- `frontend/src/index.css`
- `frontend/src/components/Layout.tsx`
- `frontend/src/pages/ComprehensiveLearningPage.tsx`
- `frontend/src/components/GrammarRoadmapView.tsx`

### **DevOps Setup**
**Created:**
- Makefile with 20+ commands
- Health check script (Node.js)
- Firebase Functions (6 cron jobs)
- GitHub Actions workflows
- Setup automation script
- Prettier configuration

**Benefits:**
- One-command deployment
- Automated quality checks
- Scheduled maintenance tasks
- Real-time health monitoring

---

## 🐛 **Known Issues**

### **High Priority**
- [ ] None currently

### **Medium Priority**
- [ ] Need to test cron jobs in production
- [ ] Health check needs Firebase token setup
- [ ] CI/CD needs Firebase service account secret

### **Low Priority**
- [ ] Add unit tests
- [ ] Add E2E tests
- [ ] Improve error handling in health check

---

## 💡 **Ideas & Future Enhancements**

### **Learning Features**
- [ ] Spaced repetition system (SRS)
- [ ] AI-powered conversation practice
- [ ] Voice recognition for pronunciation
- [ ] Handwriting recognition for kanji
- [ ] Peer learning / study groups
- [ ] Leaderboards and achievements

### **Game Features**
- [ ] Multiplayer battles
- [ ] Trading system (Pokemon-style)
- [ ] Character customization
- [ ] Seasonal events
- [ ] Daily challenges
- [ ] Boss battles with rewards

### **Technical Improvements**
- [ ] Progressive Web App (PWA)
- [ ] Offline mode
- [ ] Performance optimization
- [ ] Lazy loading for images
- [ ] Code splitting
- [ ] Service worker for caching

---

## 📊 **Metrics to Track**

### **User Engagement**
- Daily active users (DAU)
- Weekly active users (WAU)
- Session duration
- Lessons completed
- Games played
- Retention rate

### **Performance**
- Page load time
- Time to interactive
- Firestore latency
- Function execution time
- Error rate

### **Learning Progress**
- Average study time
- Completion rates
- Quiz scores
- Grammar points mastered
- Vocabulary learned

---

## 🎯 **Success Criteria**

### **MVP (Minimum Viable Product)**
- [x] Web app deployed
- [x] Grammar roadmap complete
- [x] Learning modules functional
- [x] Mobile responsive
- [ ] At least 1 game playable
- [ ] Health monitoring active
- [ ] 10+ active users

### **V1.0 Launch**
- [ ] 3+ games implemented
- [ ] Mobile app published
- [ ] 100+ active users
- [ ] 90%+ uptime
- [ ] Positive user feedback
- [ ] Complete N5 content

### **V2.0 Goals**
- [ ] 1000+ active users
- [ ] All JLPT levels (N5-N1)
- [ ] Multiplayer features
- [ ] AI tutor fully functional
- [ ] Community features
- [ ] Premium subscription

---

## 🤝 **Team & Responsibilities**

### **Current Team**
- **Developer:** Jarrel (Full-stack + Game dev)
- **Testing:** Mei's kids (User testing)
- **Feedback:** Family members

### **Future Needs**
- [ ] UI/UX designer
- [ ] Japanese language expert
- [ ] Game designer
- [ ] QA tester
- [ ] Marketing/Community manager

---

## 📚 **Resources & References**

### **Documentation**
- [Firebase Docs](https://firebase.google.com/docs)
- [React Docs](https://react.dev)
- [Flutter Docs](https://flutter.dev)
- [Flame Engine](https://flame-engine.org)
- [Tailwind CSS](https://tailwindcss.com)

### **Learning Resources**
- JLPT Official Website
- Tae Kim's Grammar Guide
- Genki Textbooks
- WaniKani (Kanji learning)
- Anki (SRS flashcards)

### **Game Design Inspiration**
- Duolingo (gamification)
- Pokemon (collection mechanics)
- Minecraft (building/exploration)
- Stickman games (simple, fun)
- Pac-Man (classic arcade)

---

## 🔐 **Security Notes**

### **Sensitive Information**
- ⚠️ Never commit Firebase credentials
- ⚠️ Use environment variables for secrets
- ⚠️ Keep `.env` files in `.gitignore`
- ⚠️ Rotate API keys regularly

### **Firestore Security Rules**
- [ ] Review and update rules
- [ ] Test with Firebase emulator
- [ ] Implement proper authentication
- [ ] Add rate limiting

---

## 📞 **Contact & Support**

### **Repository**
- GitHub: https://github.com/JorelFuji/Nihonpractice

### **Deployment**
- Production: https://nihonselfpacepractic.web.app
- Firebase Console: https://console.firebase.google.com/project/nihonselfpacepractic

### **Documentation**
- See `DEVOPS_TOOLING.md` for tooling guide
- See `BRANCHING_STRATEGY.md` for Git workflow
- See `QUICK_START.md` for quick setup

---

## ✅ **Quick Actions**

### **Start Development**
```bash
make dev
```

### **Deploy to Production**
```bash
make deploy
```

### **Check Health**
```bash
make health
```

### **View Logs**
```bash
make logs
```

---

## 📅 **Last Updated**
- **Date:** June 30, 2026
- **Branch:** scrolling-improvements-and-games
- **Status:** Ready for testing and deployment
- **Next Milestone:** Production deployment with DevOps tooling

---

**Keep this document updated with major changes!** 📝✨
