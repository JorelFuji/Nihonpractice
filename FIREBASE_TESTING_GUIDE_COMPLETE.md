# 🧪 Firebase Testing Guide - Complete Checklist

## ✅ **Deployment Complete!**

Your app is now live on Firebase Hosting!

**Main URL:** https://nihonselfpacepractic.web.app  
**Flutter Games:** https://nihonselfpacepractic-flutter.web.app

---

## 🔍 **Testing Checklist**

### **1. Home Button Test ✅**
**What to test:** Logo click functionality

**Steps:**
1. Visit any page on the site
2. Look at **top-left corner**
3. Click **🔥 日本Quest** logo
4. **Expected:** Returns to home page
5. **Test from:** Kanji page, Menu page, Profile page

**✓ Pass if:** Logo is clickable and navigates to home from all pages

---

### **2. Kanji Page - Japanese Toggle Test ✅**
**What to test:** Language switching functionality

**URL:** https://nihonselfpacepractic.web.app/kanji

**Steps:**
1. Visit Kanji page
2. **Expected:** Page loads in Japanese 🇯🇵
3. Check top-right corner for toggle button
4. Click toggle button
5. **Expected:** All text switches to English 🇺🇸
6. Click toggle again
7. **Expected:** Back to Japanese 🇯🇵

**Test these elements change language:**
- [ ] Page title (漢字べんきょう / Kanji Learning)
- [ ] Subtitle
- [ ] Stats labels (べんきょうした / Learned)
- [ ] Learning tips box
- [ ] Search placeholder
- [ ] Detail panel labels
- [ ] Mark as Learned button
- [ ] Placeholder message

**✓ Pass if:** All 20+ elements switch between Japanese and English

---

### **3. Kanji Learning Features Test ✅**
**What to test:** All learning features work

**URL:** https://nihonselfpacepractic.web.app/kanji

**Steps:**
1. Click any kanji character
2. **Expected:** Detail panel shows on right (or below on mobile)
3. **Check these sections appear:**
   - [ ] Large kanji display (8xl size)
   - [ ] 👁️ Visual Aid (purple card with emoji)
   - [ ] 🔤 Hiragana (blue card with hiragana)
   - [ ] ✏️ Stroke Order (orange card)
   - [ ] 📝 Example (green card with Japanese word)
   - [ ] Meaning section
   - [ ] JLPT Level badge
4. Click "Mark as Learned" button
5. **Expected:** Button turns green, shows checkmark
6. **Expected:** Stats update (Learned count increases)
7. Click button again to unmark
8. **Expected:** Returns to gray

**Test N5 Kanji (20 characters):**
- [ ] 一二三 (numbers with line visuals)
- [ ] 日月火水木金土 (days with emoji ☀️🌙🔥💧🌳💰🌱)
- [ ] 人 (person with 🚶)
- [ ] 四五六七八九十百千 (more numbers)

**✓ Pass if:** All kanji show complete learning data

---

### **4. Search Functionality Test ✅**
**What to test:** Search works in both languages

**URL:** https://nihonselfpacepractic.web.app/kanji

**Steps:**
1. Type in search box: "日"
2. **Expected:** Shows 日 kanji only
3. Clear search
4. Type: "sun"
5. **Expected:** Shows 日 kanji (searches meanings)
6. Clear search
7. Type: "ひ"
8. **Expected:** Shows kanji with ひ reading
9. Clear search
10. **Expected:** All kanji show again

**✓ Pass if:** Search filters by kanji, reading, and meaning

---

### **5. Level Selector Test ✅**
**What to test:** JLPT level switching

**URL:** https://nihonselfpacepractic.web.app/kanji

**Steps:**
1. Click "JLPT N5" button (should be selected by default)
2. **Expected:** Shows 20 N5 kanji
3. Click "JLPT N4" button
4. **Expected:** Shows N4 kanji set
5. Click "JLPT N3" button
6. **Expected:** Shows N3 kanji set
7. **Expected:** Selected button has gradient background
8. **Expected:** Stats update for each level

**✓ Pass if:** Level switching works and updates content

---

### **6. Responsive Design Test ✅**
**What to test:** Works on all devices

**Test on:**
- [ ] **Desktop** (> 1024px)
- [ ] **Tablet** (768px - 1024px)
- [ ] **Mobile** (< 768px)

**Desktop Test:**
```
Grid: 3 columns (kanji grid + detail panel)
Toggle: Top-right corner visible
Stats: 4 columns
Layout: Side-by-side
```

**Mobile Test:**
```
Grid: Single column, stacked
Toggle: Still visible top-right
Stats: 2x2 grid
Cards: Full width, readable
Buttons: Large touch targets
```

**✓ Pass if:** Layout adapts properly to screen size

---

### **7. Navigation Test ✅**
**What to test:** All navigation works

**Steps:**
1. From home, click "漢字 Kanji" tile
2. **Expected:** Goes to Kanji page
3. Click 🔥 logo top-left
4. **Expected:** Returns home
5. Click Menu button (top-right)
6. **Expected:** Goes to Menu page
7. Click 🔥 logo
8. **Expected:** Returns home
9. Use bottom navigation (mobile)
10. **Expected:** Navigation items work

**✓ Pass if:** All navigation paths work correctly

---

### **8. Footer Copyright Test ✅**
**What to test:** Footer appears with company info

**Steps:**
1. Scroll to bottom of any page
2. **Expected:** Footer appears
3. **Check footer contains:**
   - [ ] © 2026 Osaka Oaks LLC
   - [ ] SDVOSB designation
   - [ ] Contact: melvin.j.spiller@gmail.com
   - [ ] DUNS: 132737694
   - [ ] UEI: MUGPMK51DFB4
   - [ ] NAICS: 541512
   - [ ] "Unauthorized reproduction..." notice
   - [ ] Quick links section

**✓ Pass if:** Footer shows on all pages with complete info

---

### **9. Performance Test ✅**
**What to test:** Page loads quickly

**Tools:**
- Chrome DevTools (F12 → Network tab)
- Lighthouse (F12 → Lighthouse tab)

**Metrics to check:**
- [ ] **Load Time:** < 3 seconds
- [ ] **Bundle Size:** ~1.2 MB (shown during build)
- [ ] **Assets:** CSS + JS loading
- [ ] **No 404 errors** in console
- [ ] **No JavaScript errors** in console

**Run Lighthouse:**
```
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Click "Generate report"
4. Check scores:
   - Performance: > 80
   - Accessibility: > 90
   - Best Practices: > 80
   - SEO: > 80
```

**✓ Pass if:** Good performance scores, no errors

---

### **10. Hard Refresh Test ✅**
**What to test:** Latest version loads

**Why:** Browser cache might show old version

**Steps:**
1. Visit site normally
2. Do **Hard Refresh:**
   - **Mac:** `Cmd + Shift + R`
   - **Windows:** `Ctrl + Shift + R`
3. **Expected:** Latest features appear
4. Check console for version/build timestamp

**✓ Pass if:** Latest deployed version loads

---

## 🎮 **Flutter Games Test** (Separate Deployment)

**URL:** https://nihonselfpacepractic-flutter.web.app

### **Test Flutter Features:**
1. [ ] **Home Screen** loads in Japanese
2. [ ] **Kids Mode** button works
3. [ ] **About Screen** accessible (with copyright)
4. [ ] **5 Games** all work:
   - Hiragana Match
   - Memory Game  
   - Trace Practice
   - Puzzle Game
   - Fast Tap
5. [ ] **Audio** plays for pronunciation
6. [ ] **Animations** smooth
7. [ ] **Touch/Click** responsive

**✓ Pass if:** All games playable, no crashes

---

## 🐛 **Bug Reporting Checklist**

If you find issues, note:
- [ ] **What page:** URL where issue occurred
- [ ] **What action:** What you clicked/did
- [ ] **Expected:** What should happen
- [ ] **Actual:** What actually happened
- [ ] **Device:** Desktop/Mobile/Tablet
- [ ] **Browser:** Chrome/Safari/Firefox/Edge
- [ ] **Console errors:** Any red errors in F12 console

---

## 🔧 **Common Issues & Fixes**

### **Issue: Old version showing**
**Fix:** Hard refresh (`Cmd/Ctrl + Shift + R`)

### **Issue: Features not working**
**Fix:** 
1. Check console for errors (F12)
2. Clear browser cache
3. Try incognito/private mode

### **Issue: Toggle button not visible**
**Fix:** 
1. Hard refresh
2. Check you're on /kanji page
3. Look top-right corner

### **Issue: Logo not clickable**
**Fix:**
1. Hard refresh
2. Check cursor changes to pointer on hover
3. Try different browser

---

## ✅ **Complete Test Workflow**

### **Quick 5-Minute Test:**
```
1. Visit home page
2. Click Kanji tile
3. Toggle Japanese/English
4. Click a kanji
5. Mark as learned
6. Click logo to go home
7. Check footer
```

### **Full 15-Minute Test:**
```
1. Home page load ✓
2. Navigate to Kanji ✓
3. Test language toggle ✓
4. Test all 20 N5 kanji ✓
5. Test search function ✓
6. Test level switching ✓
7. Test marking learned ✓
8. Test home button from multiple pages ✓
9. Check footer on all pages ✓
10. Test responsive (resize browser) ✓
11. Check console for errors ✓
12. Run Lighthouse test ✓
```

### **Mobile Test (5 Minutes):**
```
1. Open on phone/tablet
2. Test touch navigation
3. Check responsive layout
4. Test kanji selection
5. Test toggle button
6. Test home button
```

---

## 📊 **Test Results Template**

Use this to track your testing:

```
Date: [Today's date]
Tester: [Your name]
Environment: [Browser + Device]

Tests:
✅ Home button - PASS/FAIL
✅ Language toggle - PASS/FAIL  
✅ Kanji learning features - PASS/FAIL
✅ Search - PASS/FAIL
✅ Level selector - PASS/FAIL
✅ Responsive design - PASS/FAIL
✅ Navigation - PASS/FAIL
✅ Footer - PASS/FAIL
✅ Performance - PASS/FAIL
✅ Hard refresh - PASS/FAIL

Notes:
[Any issues found]

Overall: PASS/FAIL
```

---

## 🚀 **Quick Test URLs**

Copy-paste these to test quickly:

**Main App:**
```
https://nihonselfpacepractic.web.app
```

**Kanji Page (Bilingual):**
```
https://nihonselfpacepractic.web.app/kanji
```

**Menu Page:**
```
https://nihonselfpacepractic.web.app/menu
```

**Flutter Games:**
```
https://nihonselfpacepractic-flutter.web.app
```

**Firebase Console:**
```
https://console.firebase.google.com/project/nihonselfpacepractic/overview
```

---

## 📱 **Testing Commands**

### **Check Build:**
```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend
npm run build
```

### **Local Test:**
```bash
npm run dev
# Visit: http://localhost:5173
```

### **Deploy:**
```bash
firebase deploy --only hosting
```

### **Deploy Flutter:**
```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile
flutter build web
firebase deploy --only hosting:flutter
```

---

## 🎯 **Success Criteria**

Your app passes if:
- ✅ All pages load without errors
- ✅ Home button works from every page
- ✅ Language toggle switches all text
- ✅ All 20 kanji show complete data
- ✅ Search filters correctly
- ✅ Level switching works
- ✅ Progress tracking works
- ✅ Footer shows on all pages
- ✅ Responsive on mobile/tablet/desktop
- ✅ No console errors
- ✅ Performance scores > 80

---

## 🎊 **Your App is Live!**

**Status:** ✅ Deployed Successfully  
**Build Size:** 1,249 KB  
**Files:** 3 (HTML, CSS, JS)  
**Hosting:** Firebase  

**What's Live:**
- ✅ Home button (clickable logo)
- ✅ Kanji page with Japanese/English toggle
- ✅ 20 enhanced kanji with visuals
- ✅ Copyright footer (Osaka Oaks LLC)
- ✅ All navigation working
- ✅ Responsive design
- ✅ Flutter games (separate URL)

**Ready to test!** 🚀

---

**© 2026 Osaka Oaks LLC** - Service-Disabled Veteran-Owned Small Business (SDVOSB)
