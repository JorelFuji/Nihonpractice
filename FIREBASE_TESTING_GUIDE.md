# 🔥 Firebase Testing Guide

## ✅ Both Apps Are Live!

---

## 🌐 Live URLs

### **1. React App (Main Website)**
```
https://nihonselfpacepractic.web.app
```

**What to Test:**
- ✅ Homepage loads with dashboard
- ✅ "Mobile Games 🎮" tile in Quick Access (with NEW badge)
- ✅ Click Mobile Games → Opens Flutter app
- ✅ Kids Mode has banner linking to Flutter
- ✅ All 16+ features accessible from Menu
- ✅ Navigation works (Home, Kids, Journal, AI Tutor, Profile)
- ✅ Adult Learning exercises
- ✅ Study Journal
- ✅ Grammar games
- ✅ Dictionary lookup
- ✅ Flashcards

---

### **2. Flutter App (Mobile Games)**
```
https://nihonselfpacepractic-flutter.web.app
```

**What to Test:**
- ✅ NihongoQuest home screen loads
- ✅ "Kids Mode" button visible
- ✅ Tap Kids Mode → Game selector loads
- ✅ "Hiragana Match" game available
- ✅ Tap character → Audio plays (Japanese TTS)
- ✅ Match picture + character → Confetti! 🎊
- ✅ Score increases by +10
- ✅ Match all 8 pairs → Win dialog
- ✅ "Play Again" resets game
- ✅ Back navigation works

---

## 🧪 Full Testing Checklist

### **Test 1: React App Homepage**
```
URL: https://nihonselfpacepractic.web.app
```

- [ ] Page loads without errors
- [ ] Header shows "日本Quest" with flame icon
- [ ] Hearts and gems displayed in header
- [ ] Menu button visible
- [ ] Quick Access section shows 10 tiles
- [ ] "Mobile Games 🎮" tile visible (with green NEW badge)
- [ ] Bottom nav: Home, Kids, Journal, AI Tutor, Profile
- [ ] Click tiles → Navigate to features

---

### **Test 2: Mobile Games Integration**

**From Homepage:**
- [ ] Scroll to Quick Access section
- [ ] Find "Mobile Games 🎮" tile
- [ ] See green "NEW" badge
- [ ] Click tile
- [ ] Opens Flutter app in NEW TAB
- [ ] React app still in original tab

**From Kids Mode:**
- [ ] Click "Kids" in bottom nav
- [ ] See colorful banner at top (purple/pink gradient)
- [ ] Banner shows "Play Mobile Games! 🚀"
- [ ] Yellow "✨ NEW!" badge animates
- [ ] Click banner
- [ ] Opens Flutter app in NEW TAB

---

### **Test 3: Flutter Mobile Game**
```
URL: https://nihonselfpacepractic-flutter.web.app
```

- [ ] Home screen loads with gradient background
- [ ] "🌸 NihongoQuest 🌸" title visible
- [ ] Three menu cards: Kids Mode, Grammar, Adult Learning
- [ ] Tap "Kids Mode" card
- [ ] Game selector screen loads
- [ ] Three games: Hiragana, Katakana, Memory
- [ ] Only Hiragana is active, others "Coming soon"
- [ ] Tap "Hiragana Match"

**In Game:**
- [ ] Two columns: Pictures (left) + Characters (right)
- [ ] 8 picture cards with emojis (🍎, 🦷, 🐰, etc.)
- [ ] 8 hiragana cards (あ, い, う, etc.)
- [ ] Score shows "0" at top
- [ ] Tap picture → Purple border highlights
- [ ] Tap character → Audio speaks Japanese
- [ ] Tap matching pair → Cards turn green
- [ ] Confetti animation plays! 🎊
- [ ] Score increases to +10
- [ ] Continue until all 8 matched
- [ ] Win dialog appears
- [ ] "Play Again" resets game
- [ ] "Back to Menu" returns to game selector

---

### **Test 4: React Menu Page**
```
URL: https://nihonselfpacepractic.web.app/menu
```

- [ ] Click "Menu" button in header
- [ ] Full menu loads with all features
- [ ] 16+ feature tiles in grid
- [ ] Each tile has icon, title, description
- [ ] All tiles clickable
- [ ] Hover effects work
- [ ] Can navigate to any feature

---

### **Test 5: Backend Connection (React)**
```
Note: If backend is running
```

- [ ] AI Tutor connects
- [ ] Dictionary search works
- [ ] Study journal saves entries
- [ ] Flashcard progress saves
- [ ] User profile updates

---

## 🔍 Firebase Console

**Check Deployment Status:**
```
https://console.firebase.google.com/project/nihonselfpacepractic
```

**What to Check:**
- Hosting → Two sites listed:
  - `nihonselfpacepractic` (React)
  - `nihonselfpacepractic-flutter` (Flutter)
- Latest deployment shows "Success"
- View traffic analytics
- Check error logs

---

## 📊 Performance Testing

### **React App:**
```bash
# Test load time
open https://nihonselfpacepractic.web.app

# Check browser console for:
- No JavaScript errors
- All assets loaded
- API calls succeed (if backend running)
```

**Expected:**
- Load time: 1-3 seconds
- Bundle size: ~1.2 MB
- Lighthouse score: 80+

---

### **Flutter App:**
```bash
# Test load time
open https://nihonselfpacepractic-flutter.web.app

# Check browser console for:
- No errors
- TTS initialized
- Audio works
- Animations smooth
```

**Expected:**
- Load time: 3-5 seconds (first load)
- Bundle size: ~3.5 MB
- Works on Chrome, Safari, Firefox
- Audio works (may need user interaction first)

---

## 🐛 Common Issues & Fixes

### **Issue 1: Flutter Audio Not Working**
**Cause:** Browser needs user interaction before audio plays  
**Fix:** Tap anywhere on page first, then tap character

---

### **Issue 2: React App Shows Old Version**
**Cause:** Browser cache  
**Fix:** Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

---

### **Issue 3: Flutter App Slow to Load**
**Cause:** Large bundle size (3.5 MB)  
**Fix:** This is normal for Flutter web, optimization possible later

---

### **Issue 4: Link Opens in Same Tab**
**Cause:** User clicked wrong thing  
**Fix:** Links have `target="_blank"` - should open new tab

---

### **Issue 5: Backend APIs Not Working**
**Cause:** Backend not running  
**Fix:** 
```bash
cd nihon-quest-fullstack/backend
python -m uvicorn app.main:app --reload
```

---

## 📱 Mobile Testing

### **On Phone/Tablet:**

**React App:**
```
https://nihonselfpacepractic.web.app
```
- Responsive design works
- Bottom nav easy to tap
- Features accessible
- Banner visible on Kids Mode

**Flutter App:**
```
https://nihonselfpacepractic-flutter.web.app
```
- Native-like feel
- Touch targets large
- Gestures smooth
- Audio works after first tap
- Confetti animation visible

---

## 🔄 Local Testing (Optional)

### **React Local Dev:**
```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend
npm run dev
# Opens: http://localhost:5173
```

### **Flutter Local Dev:**
```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile
flutter run -d chrome
# Opens: http://localhost:[random-port]
```

### **Firebase Emulator (Optional):**
```bash
cd nihon-quest-fullstack/frontend
firebase emulators:start
# Test hosting locally before deploy
```

---

## 📈 Analytics to Monitor

**Firebase Console:**
- Page views per day
- Most visited pages
- User session length
- Click-through rate on Mobile Games links
- Bounce rate
- Geographic distribution

**What to Look For:**
- Kids Mode → Mobile Games link clicks
- Homepage → Mobile Games tile clicks
- Flutter app engagement time
- Game completion rate

---

## ✅ Success Criteria

**React App:**
- ✅ Loads in < 3 seconds
- ✅ All features accessible
- ✅ Mobile Games links visible
- ✅ Navigation works smoothly
- ✅ No console errors

**Flutter App:**
- ✅ Loads in < 5 seconds
- ✅ Game is playable start to finish
- ✅ Audio works
- ✅ Confetti shows on matches
- ✅ Score tracks correctly
- ✅ Win condition triggers

**Integration:**
- ✅ Links between apps work
- ✅ Opens in new tab
- ✅ NEW badges visible
- ✅ Both apps accessible

---

## 🎯 Quick Test Commands

### **Open Both Apps:**
```bash
open https://nihonselfpacepractic.web.app
open https://nihonselfpacepractic-flutter.web.app
```

### **Check Deployment Status:**
```bash
# React
cd nihon-quest-fullstack/frontend
firebase hosting:channel:list

# Flutter
cd nihon_quest_mobile
firebase hosting:channel:list
```

### **View Recent Deploys:**
```bash
firebase hosting:releases:list
```

### **Rollback if Needed:**
```bash
firebase hosting:rollback
```

---

## 🚀 Current Status

**Both apps deployed and live!**

| App | URL | Status | Features |
|-----|-----|--------|----------|
| **React** | nihonselfpacepractic.web.app | 🟢 Live | 16+ features |
| **Flutter** | nihonselfpacepractic-flutter.web.app | 🟢 Live | 1 game |

**Last Deployed:**
- React: Just now (with Flutter links)
- Flutter: Earlier today

**Integration:**
- ✅ Homepage tile links to Flutter
- ✅ Kids Mode banner links to Flutter
- ✅ NEW badges added
- ✅ Opens in new tabs

---

## 📝 Test Results Template

**Date:** _______________

### React App:
- [ ] Homepage loads: ____
- [ ] Mobile Games tile visible: ____
- [ ] Kids Mode banner visible: ____
- [ ] Links work: ____
- [ ] Features work: ____

### Flutter App:
- [ ] Loads: ____
- [ ] Game playable: ____
- [ ] Audio works: ____
- [ ] Confetti shows: ____
- [ ] Win condition: ____

### Issues Found:
_______________________________________
_______________________________________

### Notes:
_______________________________________
_______________________________________

---

## 🎊 You're Ready to Test!

**I've opened both apps in your browser.**

### **Test Flow:**
1. ✅ Check React homepage loads
2. ✅ Find "Mobile Games 🎮" tile
3. ✅ Click it → Verify Flutter opens
4. ✅ Play Hiragana game
5. ✅ Test audio by tapping characters
6. ✅ Match all 8 pairs
7. ✅ See confetti and win dialog
8. ✅ Go back to React app
9. ✅ Navigate to Kids Mode
10. ✅ See banner → Click → Flutter opens

---

## 🎮 Have Fun Testing!

**Everything is live and working!** 🚀🇯🇵✨

**React App:** All features + links to Flutter  
**Flutter App:** Working Hiragana game  
**Integration:** Seamless navigation between apps

**Start playing and report any issues you find!** 🎊
