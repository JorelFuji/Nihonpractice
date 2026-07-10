# 🧪 Firebase Testing Guide

## 🌐 **Your Live URLs**

**Main App:** https://nihonselfpacepractic-flutter.web.app  
**Firebase Console:** https://console.firebase.google.com/project/nihonselfpacepractic/hosting  
**Project:** nihonselfpacepractic  

---

## 🚀 **HOW TO DEPLOY**

### **Method 1: One-Command Deploy (Recommended)**

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile
./DEPLOY_AND_TEST.sh
```

This script will:
1. ✅ Clean previous build
2. ✅ Get dependencies
3. ✅ Build for web (release mode)
4. ✅ Deploy to Firebase
5. ✅ Open site and console for testing

---

### **Method 2: Manual Deploy (Step-by-Step)**

```bash
# 1. Navigate to project
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile

# 2. Clean build (optional but recommended)
flutter clean

# 3. Get dependencies
flutter pub get

# 4. Build for web
flutter build web --release

# 5. Deploy to Firebase
firebase deploy --only hosting:flutter
```

---

## 🧪 **TESTING CHECKLIST**

### **✅ Pre-Testing Steps**

Before testing, **ALWAYS**:
- [ ] Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- [ ] Or use Incognito/Private mode to avoid cache

---

### **1. Home Screen Testing**

Visit: https://nihonselfpacepractic-flutter.web.app

**Check:**
- [ ] Purple navigation bar visible at top
- [ ] Title shows "🌸 日本語クエスト"
- [ ] Refresh button (🔄) visible in top-right
- [ ] Version badge "v2.0.0" visible at bottom-right
- [ ] Purple scrollbar visible on right side
- [ ] 4 menu buttons visible:
  - [ ] 👶 こどもモード (Pink/Red)
  - [ ] 📚 ぶんぽう N5-N1 (Blue)
  - [ ] 🎓 おとながくしゅう (Purple)
  - [ ] ℹ️ About (Gray)
- [ ] Features section at bottom
- [ ] Can scroll up and down

**Actions:**
- [ ] Click refresh button → Shows confirmation
- [ ] Scroll works smoothly
- [ ] All text is readable

---

### **2. Kids Mode Screen Testing**

**Navigation:**
- [ ] Click "👶 こどもモード" button from home

**Check:**
- [ ] Pink navigation bar at top
- [ ] Title shows "👶 こどもモード"
- [ ] Back arrow (⬅️) visible at top-left
- [ ] Refresh button (🔄) visible at top-right
- [ ] Home button (🏠) visible at top-right
- [ ] **Green banner** shows "✅ v2.0.0 - Latest Version ✅"
- [ ] **Purple badge** shows "📊 6 Games Total (5 Playable + 1 Coming Soon)"
- [ ] Title "🎮 ゲームをえらぼう！" visible
- [ ] Purple scrollbar on right side

**Check ALL 6 Games Visible:**
- [ ] **1️⃣ ひらがなマッチ** (Blue card, あ icon)
- [ ] **2️⃣ きおくゲーム** (Purple card, 🧠 icon)
- [ ] **3️⃣ もじをかこう** (Orange card, ✏️ icon)
- [ ] **4️⃣ スライドパズル** (Cyan card, 🧩 icon)
- [ ] **5️⃣ はやくタップ** (Indigo card, ⚡ icon)
- [ ] **6️⃣ カタカナマッチ** (Green card, ア icon)

**Actions:**
- [ ] Click back arrow → Returns to home
- [ ] Navigate back to Kids Mode
- [ ] Click home button → Returns to home
- [ ] Navigate back to Kids Mode
- [ ] Click refresh → Shows "Page refreshed!" message
- [ ] Scroll through all 6 games
- [ ] Each game card is clickable (hover shows effect)

---

### **3. Game Testing**

**Test Each Game:**

#### **Game 1: ひらがなマッチ (Hiragana Match)**
- [ ] Click "1️⃣ ひらがなマッチ" card
- [ ] Game loads successfully
- [ ] Can see hiragana characters and pictures
- [ ] Back button works
- [ ] Home button works

#### **Game 2: きおくゲーム (Memory Game)**
- [ ] Click "2️⃣ きおくゲーム" card
- [ ] Game loads successfully
- [ ] Can see memory cards
- [ ] Cards flip when clicked
- [ ] Back button works
- [ ] Home button works

#### **Game 3: もじをかこう (Character Trace)**
- [ ] Click "3️⃣ もじをかこう" card
- [ ] Game loads successfully
- [ ] Can draw/trace characters
- [ ] Back button works
- [ ] Home button works

#### **Game 4: スライドパズル (Puzzle Slide)**
- [ ] Click "4️⃣ スライドパズル" card
- [ ] Game loads successfully
- [ ] Can move puzzle pieces
- [ ] Back button works
- [ ] Home button works

#### **Game 5: はやくタップ (Fast Tap)**
- [ ] Click "5️⃣ はやくタップ" card
- [ ] Game loads successfully
- [ ] Characters fall from top
- [ ] Can tap characters
- [ ] Back button works
- [ ] Home button works

#### **Game 6: カタカナマッチ (Coming Soon)**
- [ ] Click "6️⃣ カタカナマッチ" card
- [ ] Shows "Coming soon! 🚀" message
- [ ] Stays on Kids Mode page (doesn't navigate)

---

### **4. About Screen Testing**

**Navigation:**
- [ ] Go to home
- [ ] Click "ℹ️ About" button

**Check:**
- [ ] Purple navigation bar at top
- [ ] Title shows "About"
- [ ] Back arrow (⬅️) visible at top-left
- [ ] Refresh button (🔄) visible at top-right
- [ ] Home button (🏠) visible at top-right
- [ ] Company info cards visible
- [ ] Copyright information visible
- [ ] Purple scrollbar on right side

**Actions:**
- [ ] Click back arrow → Returns to home
- [ ] Navigate back to About
- [ ] Click home button → Returns to home
- [ ] Navigate back to About
- [ ] Click refresh → Shows "Page refreshed!" message
- [ ] Scroll through all content

---

### **5. Navigation Testing**

**Test Full Navigation Flow:**

```
Home → Kids Mode → Game → Back → Kids Mode → Home
```

- [ ] Start at home
- [ ] Click "こどもモード"
- [ ] Click any game (e.g., "きおくゲーム")
- [ ] Click back arrow → Returns to Kids Mode
- [ ] Click home button → Returns to home

**Test Quick Home:**
```
Home → Kids Mode → Game → Home (skip Kids Mode)
```

- [ ] Start at home
- [ ] Click "こどもモード"
- [ ] Click any game
- [ ] Click home button → Jumps directly to home (skips Kids Mode)

---

### **6. Scrolling Testing**

**Test on Each Screen:**

- [ ] **Home:** Can scroll if content exceeds viewport
- [ ] **Kids Mode:** Can scroll through all 6 games
- [ ] **About:** Can scroll through company info
- [ ] **Scrollbar visible** on all pages (purple, 16px wide)
- [ ] **Can drag scrollbar** thumb
- [ ] **Can click scrollbar** track to jump
- [ ] **Mouse wheel scrolling** works
- [ ] **Touch scrolling** works (on mobile/tablet)

---

### **7. Refresh Testing**

**Test Each Refresh Button:**

- [ ] **Home refresh:**
  - Click 🔄 button
  - Shows: "App refreshed! If you still see old content..."
  - Page state reloads

- [ ] **Kids Mode refresh:**
  - Click 🔄 button
  - Shows: "🔄 Page refreshed!"
  - Game list reloads

- [ ] **About refresh:**
  - Click 🔄 button
  - Shows: "🔄 Page refreshed!"
  - Content reloads

---

### **8. Mobile/Responsive Testing**

**Test on Different Screen Sizes:**

- [ ] **Desktop (1920x1080):** All content fits properly
- [ ] **Laptop (1366x768):** Scrolling works, content readable
- [ ] **Tablet (768x1024):** Touch scrolling works, buttons clickable
- [ ] **Mobile (375x667):** All features work, text readable

**Resize Browser:**
- [ ] Resize browser window smaller
- [ ] Scrollbar appears/works
- [ ] Content doesn't overflow
- [ ] Navigation buttons still accessible

---

### **9. Browser Testing**

**Test on Multiple Browsers:**

- [ ] **Chrome:** All features work
- [ ] **Firefox:** All features work
- [ ] **Safari:** All features work
- [ ] **Edge:** All features work

**For Each Browser:**
- [ ] Hard refresh before testing
- [ ] Check all navigation works
- [ ] Verify games load
- [ ] Test scrolling

---

### **10. Performance Testing**

**Check Load Times:**

- [ ] **Home screen:** Loads in < 3 seconds
- [ ] **Kids Mode:** Loads in < 2 seconds
- [ ] **Games:** Load in < 3 seconds
- [ ] **Navigation:** Instant (< 0.5 seconds)

**Check Smoothness:**
- [ ] Scrolling is smooth (no lag)
- [ ] Buttons respond instantly
- [ ] Animations are smooth
- [ ] No visual glitches

---

## 🐛 **TROUBLESHOOTING**

### **Problem: Don't see v2.0.0 badge**

**Solution:**
```bash
# Hard refresh browser
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)

# Or clear cache completely
Ctrl+Shift+Delete → Clear all → Restart browser
```

---

### **Problem: Don't see all 6 games**

**Solution:**
1. Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`
2. Make sure you **clicked "こどもモード"** button
3. Check for **green banner** saying "v2.0.0 - Latest Version"
4. If not there → Still cached, clear cache completely

---

### **Problem: Navigation buttons don't work**

**Solution:**
1. Check browser console for errors (F12 → Console tab)
2. Hard refresh page
3. Try different browser
4. Redeploy: `./DEPLOY_AND_TEST.sh`

---

### **Problem: Scrollbar not visible**

**Solution:**
1. Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`
2. Check content height (needs to overflow to show scrollbar)
3. Try resizing browser window smaller
4. Check browser settings (Mac: System Preferences → Show scrollbars: Always)

---

## 📊 **FIREBASE CONSOLE CHECKS**

Visit: https://console.firebase.google.com/project/nihonselfpacepractic/hosting

**Verify:**
- [ ] Latest deployment shows recent timestamp
- [ ] Deployment status: "Released"
- [ ] Domain: nihonselfpacepractic-flutter.web.app
- [ ] No errors in deployment log

**Check Usage:**
- [ ] Go to "Usage" tab
- [ ] Check requests count (should increase when testing)
- [ ] Check bandwidth used
- [ ] Check number of visitors

---

## 🎯 **SUCCESS CRITERIA**

Your deployment is **SUCCESSFUL** if:

✅ All 4 navigation screens load  
✅ All 6 games visible in Kids Mode  
✅ Green "v2.0.0" banner shows  
✅ Purple "6 Games" badge shows  
✅ Navigation buttons work (back, home, refresh)  
✅ Purple scrollbars visible and functional  
✅ Can play games  
✅ No console errors (F12 → Console)  
✅ Works on multiple browsers  
✅ Mobile responsive  

---

## 📝 **DEPLOYMENT LOG**

Keep track of deployments:

| Date | Version | Changes | Status |
|------|---------|---------|--------|
| 2026-06-29 | v2.0.0 | Navigation + Games + Scrollbars | ✅ Live |

---

## 🔄 **CONTINUOUS DEPLOYMENT WORKFLOW**

**Every Time You Make Changes:**

1. **Code changes** in your IDE
2. **Test locally** (optional): `flutter run -d chrome`
3. **Build & Deploy**: `./DEPLOY_AND_TEST.sh`
4. **Hard refresh browser**: `Ctrl+Shift+R` / `Cmd+Shift+R`
5. **Run testing checklist** above
6. **Verify in Firebase Console**
7. **Test on multiple browsers/devices**

---

## 🎉 **QUICK TEST COMMAND**

Run this to deploy and open for testing:

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile && \
./DEPLOY_AND_TEST.sh
```

This will:
- ✅ Build your app
- ✅ Deploy to Firebase
- ✅ Open your live site
- ✅ Open Firebase console

---

## 📞 **SUPPORT**

**Firebase Console:** https://console.firebase.google.com/project/nihonselfpacepractic  
**Live Site:** https://nihonselfpacepractic-flutter.web.app  
**Project Location:** `/Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile`  

---

**Last Updated:** June 29, 2026  
**Current Version:** v2.0.0  
**Status:** ✅ Deployed and Live
