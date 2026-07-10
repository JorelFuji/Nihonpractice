# 🚀 DEPLOYMENT INSTRUCTIONS

**App:** NihongoQuest Flutter (Kids Mode)  
**Target:** Firebase Hosting  
**URL:** https://nihonselfpacepractic-flutter.web.app/  
**Date:** June 30, 2026  

---

## ⚡ **QUICK DEPLOY (Copy & Paste)**

Open your terminal and run these commands:

```bash
# Navigate to project
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile

# Install dependencies
flutter pub get

# Build for web (release mode)
flutter build web --release

# Deploy to Firebase
firebase deploy --only hosting
```

**That's it!** 🎉

---

## 📝 **STEP-BY-STEP GUIDE**

### **Step 1: Navigate to Project**

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile
```

Verify you're in the right place:
```bash
ls -la
# You should see: pubspec.yaml, lib/, web/, etc.
```

---

### **Step 2: Install Dependencies**

```bash
flutter pub get
```

**Expected output:**
```
Running "flutter pub get" in nihon_quest_mobile...
Resolving dependencies...
+ shared_preferences 2.2.2
Got dependencies!
```

**If this fails:**
- Check Flutter is installed: `flutter --version`
- Update Flutter: `flutter upgrade`
- Install Flutter: https://flutter.dev/docs/get-started/install

---

### **Step 3: Build for Web**

```bash
flutter build web --release
```

**Expected output:**
```
Building for web...
Compiling lib/main.dart for the Web...
✓ Built build/web
```

**Build time:** ~2-5 minutes (first time), ~30 seconds (subsequent builds)

**If this fails:**
- Run: `flutter clean`
- Then: `flutter pub get`
- Then: `flutter build web --release`

---

### **Step 4: Deploy to Firebase**

```bash
firebase deploy --only hosting
```

**Expected output:**
```
=== Deploying to 'nihonselfpacepractic-flutter'...

i  deploying hosting
i  hosting[nihonselfpacepractic-flutter]: beginning deploy...
✔  hosting[nihonselfpacepractic-flutter]: file upload complete
✔  Deploy complete!

Hosting URL: https://nihonselfpacepractic-flutter.web.app
```

**If this fails:**
- Login to Firebase: `firebase login`
- Check project: `firebase projects:list`
- Check target: `cat .firebaserc`

---

### **Step 5: Test the Deployment**

1. **Open the URL:**
   - https://nihonselfpacepractic-flutter.web.app/

2. **Hard Refresh** (to clear cache):
   - **Mac:** `Cmd + Shift + R`
   - **Windows/Linux:** `Ctrl + Shift + R`

3. **Test Features:**
   - ✅ Click "こどもモード" (Kids Mode)
   - ✅ See "6 Games - All Ready to Play!"
   - ✅ Try Hiragana Match (Game 1)
   - ✅ Try Katakana Match (Game 6) - NEW!
   - ✅ Check high score tracking
   - ✅ Click help button (?) for tutorial

---

## 🎯 **WHAT YOU SHOULD SEE:**

### **Home Screen:**
- Title: "🌸 日本語クエスト 🌸"
- 5 menu cards:
  1. 👶 こどもモード (Kids Mode)
  2. 📚 ぶんぽう N5-N1 (Coming soon)
  3. 🎓 おとながくしゅう (Coming soon)
  4. 🕹️ レトロゲーム (Retro Games)
  5. ℹ️ About
- Version badge: v2.0.0

### **Kids Mode Screen:**
- Green badge: "✅ 6 Games - All Ready to Play!"
- 6 game cards:
  1. **あ Hiragana Match** (Blue) - ENHANCED ⭐
  2. **🧠 Memory Game** (Purple)
  3. **✏️ Character Trace** (Orange)
  4. **🧩 Puzzle Slide** (Cyan)
  5. **⚡ Fast Tap** (Indigo)
  6. **ア Katakana Match** (Green) - NEW! ⭐

### **Hiragana Match Game (Enhanced):**
- AppBar: "Match Hiragana!"
- Blue background gradient
- **Help button (?)** - Click to see tutorial ⭐
- **High Score display** (if you've played before) ⭐
- Current score chip
- Pictures on left (46 characters available!)
- Hiragana on right
- Match pairs to win!

### **Katakana Match Game (NEW):**
- AppBar: "Match Katakana!"
- Green background gradient
- **Help button (?)** ⭐
- **High Score display** ⭐
- Current score chip
- Pictures on left (8 characters)
- Katakana on right
- Match pairs to win!

---

## 🐛 **TROUBLESHOOTING**

### **Problem: "flutter: command not found"**

**Solution:**
1. Install Flutter: https://flutter.dev/docs/get-started/install
2. Add to PATH:
   ```bash
   export PATH="$PATH:`pwd`/flutter/bin"
   ```
3. Verify: `flutter doctor`

---

### **Problem: "firebase: command not found"**

**Solution:**
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Login:
   ```bash
   firebase login
   ```
3. Test:
   ```bash
   firebase projects:list
   ```

---

### **Problem: "Build failed" or compile errors**

**Solution:**
```bash
# Clean build
flutter clean

# Get dependencies
flutter pub get

# Try again
flutter build web --release
```

---

### **Problem: "Old version showing after deploy"**

**Solution:**
1. **Hard refresh browser:**
   - Mac: `Cmd + Shift + R`
   - Windows: `Ctrl + Shift + R`
   - Or clear browser cache completely

2. **Check Firebase cache settings:**
   - Verify `firebase.json` has proper cache headers
   - Add cache busting if needed

3. **Force rebuild:**
   ```bash
   flutter clean
   flutter build web --release
   firebase deploy --only hosting
   ```

---

### **Problem: "Some features not working"**

**Solution:**
1. Check browser console for errors (F12)
2. Verify all files deployed:
   ```bash
   ls -la build/web/
   ```
3. Check Firebase hosting files:
   - Firebase Console → Hosting → Files

---

## 📦 **WHAT'S BEING DEPLOYED:**

### **New Features:**
- ✅ All 46 hiragana characters
- ✅ Katakana Match game (Game 6)
- ✅ Score persistence (high scores save!)
- ✅ Tutorial system (help buttons)
- ✅ New high score celebrations
- ✅ Enhanced UI

### **Files Modified/Created:**
- `lib/models/picture_card.dart` - 46 hiragana + support classes
- `lib/screens/katakana_match_screen.dart` - NEW GAME!
- `lib/screens/hiragana_match_screen.dart` - Enhanced with persistence
- `lib/services/progress_service.dart` - Score tracking
- `lib/widgets/tutorial_dialog.dart` - Tutorial system
- `lib/screens/kids_mode_screen.dart` - Updated navigation

### **Total Build Size:**
- Assets: ~2 MB
- JavaScript: ~1.4 MB (gzipped: ~374 KB)
- HTML/CSS: ~75 KB
- **Total:** ~3.5 MB (will load fast!)

---

## 🎮 **TEST CHECKLIST:**

After deployment, test these:

### **Navigation:**
- [ ] Home screen loads
- [ ] Kids Mode button works
- [ ] All 6 games appear
- [ ] Back button returns to menu

### **Hiragana Match (Enhanced):**
- [ ] Game loads
- [ ] Help button (?) shows tutorial
- [ ] High score displays (after playing once)
- [ ] Can match characters
- [ ] Win dialog shows
- [ ] "New High Score!" appears when beaten
- [ ] Play Again works
- [ ] Score persists after reload

### **Katakana Match (NEW):**
- [ ] Game loads with green theme
- [ ] Help button (?) works
- [ ] Can match katakana
- [ ] Win dialog shows
- [ ] Score persists

### **Other Games:**
- [ ] Memory Game works
- [ ] Character Trace works
- [ ] Puzzle Slide works
- [ ] Fast Tap works

---

## 📊 **DEPLOYMENT CHECKLIST:**

Before you deploy:
- [x] All code changes committed
- [x] Dependencies updated (shared_preferences added)
- [x] New files created (6 new files)
- [x] Tests passing (manual testing)
- [x] No console errors

After you deploy:
- [ ] URL loads successfully
- [ ] Hard refresh browser
- [ ] Test all 6 games
- [ ] Verify high scores save
- [ ] Check tutorials work
- [ ] Test on mobile device
- [ ] Get user feedback

---

## 🌐 **LIVE URL:**

**Production:**
- https://nihonselfpacepractic-flutter.web.app/

**Firebase Console:**
- https://console.firebase.google.com/project/nihonselfpacepractic-flutter/hosting

**Check Deployment:**
```bash
firebase hosting:channel:list
```

---

## 🎉 **SUCCESS!**

When deployment is complete, you'll see:

```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/...
Hosting URL: https://nihonselfpacepractic-flutter.web.app
```

**Visit the URL and enjoy your upgraded app!** 🚀

---

## 📞 **NEED HELP?**

If deployment fails:
1. Check `flutter doctor -v` output
2. Verify Firebase login: `firebase login --reauth`
3. Check project config: `cat .firebaserc`
4. Review Firebase console for errors
5. Check browser console (F12) for runtime errors

---

## 🎊 **VERSION DEPLOYED:**

**v2.1.0 - "Complete Hiragana & Persistence Update"**

**What's New:**
- ✅ All 46 hiragana characters
- ✅ Katakana Match game
- ✅ Score persistence system
- ✅ Tutorial dialogs
- ✅ High score tracking
- ✅ New high score celebrations
- ✅ Enhanced UI/UX

**Next Version (v2.2.0):**
- Sound effects
- Visual enhancements
- Achievement UI
- Difficulty levels

---

**Ready to deploy? Run the commands at the top of this file!** 🚀
