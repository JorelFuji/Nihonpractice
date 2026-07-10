# 🔄 CACHE BUSTING & REFRESH GUIDE

## ✅ **DEPLOYED** - v2.0.0 with Auto-Refresh Features

**Live URL:** https://nihonselfpacepractic-flutter.web.app

---

## 🎯 WHAT WAS ADDED

### **1. 🔴 Floating Refresh Button (TOP RIGHT)**
- Purple circular button with refresh icon
- Located at **top-right corner** of home screen
- **Click it** to refresh the app state
- Shows confirmation message with instructions

### **2. 📌 Version Badge (BOTTOM RIGHT)**
- Shows current version: **v2.0.0**
- Located at **bottom-right corner**
- Purple badge with white text
- Helps you verify you have the latest version

### **3. 🚫 Aggressive Cache Prevention**
- Server headers that **prevent caching**
- HTML meta tags that **force fresh content**
- Files are **never cached** (always fetched fresh)

---

## 🚀 HOW TO SEE THE GAMES

### **Step 1: Clear Your Browser Cache COMPLETELY**

**Method A: Hard Refresh (Quickest)**
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

**Method B: Clear All Data (Most Thorough)**
1. Press `Ctrl/Cmd + Shift + Delete`
2. Select **"All time"** in time range
3. Check:
   - ✅ Cached images and files
   - ✅ Cookies and site data
4. Click **"Clear data"**

**Method C: DevTools (Best for Testing)**
1. Press `F12` to open DevTools
2. Go to **"Network"** tab
3. Check **"Disable cache"** checkbox
4. Right-click refresh button
5. Select **"Empty Cache and Hard Reload"**

---

### **Step 2: Visit the Site**
Go to: **https://nihonselfpacepractic-flutter.web.app**

---

### **Step 3: You Should See:**

**On Home Screen:**
```
┌────────────────────────────────┐
│ 🔄 [Refresh]        (top right)│
│                                │
│   🌸 日本語クエスト 🌸         │
│                                │
│   [👶 こどもモード] ← CLICK THIS
│   [📚 Grammar]                 │
│   [🎓 Adult Learning]          │
│   [ℹ️ About]                   │
│                                │
│                  v2.0.0 (bottom)│
└────────────────────────────────┘
```

**Key Features:**
- ✅ **Refresh button** (top-right corner) - purple circle
- ✅ **Version badge** (bottom-right corner) - shows "v2.0.0"
- ✅ **Purple scrollbar** (right side) - thick and visible
- ✅ **4 menu buttons** - Kids Mode, Grammar, Adult, About

---

### **Step 4: Access the Games**

1. **Click** the pink button: **`👶 こどもモード`** (Kids Mode)
2. You'll see **6 game cards**:
   - ✅ **あ ひらがなマッチ** (Hiragana Match)
   - ✅ **🧠 きおくゲーム** (Memory Game)
   - ✅ **✏️ もじをかこう** (Character Trace)
   - ✅ **🧩 スライドパズル** (Puzzle Slide)
   - ✅ **⚡ はやくタップ** (Fast Tap)
   - ⏳ **ア カタカナマッチ** (Coming Soon)

3. **Click any game** to play!

---

## 🔧 CACHE BUSTING MECHANISMS

### **Server-Side (Firebase Hosting)**

**File: `firebase.json`**
```json
"headers": [
  {
    "source": "**/*.@(html|js|css|json)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "no-cache, no-store, must-revalidate, max-age=0"
      },
      {
        "key": "Pragma",
        "value": "no-cache"
      },
      {
        "key": "Expires",
        "value": "0"
      }
    ]
  }
]
```

**What This Does:**
- ✅ `no-cache` - Browser must revalidate with server
- ✅ `no-store` - Don't store in cache at all
- ✅ `must-revalidate` - Force check with server
- ✅ `max-age=0` - Cache expires immediately
- ✅ `Pragma: no-cache` - HTTP/1.0 compatibility
- ✅ `Expires: 0` - Cache expired already

**Result:** Browser **ALWAYS** fetches fresh HTML/JS/CSS files

---

### **Client-Side (HTML Meta Tags)**

**File: `web/index.html`**
```html
<!-- CACHE BUSTING - Force always fresh content -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<meta name="version" content="2.0.0">
```

**What This Does:**
- Tells browser to **never cache** this page
- Forces **fresh fetch** on every visit
- Version tag helps **verify** you have latest

---

### **UI Features (Flutter)**

**Refresh Button Function:**
```dart
void _refreshApp() {
  setState(() {}); // Triggers UI rebuild
  ScaffoldMessenger.of(context).showSnackBar(
    const SnackBar(
      content: Text('🔄 App refreshed! If you still see old content, 
                     hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)'),
      duration: Duration(seconds: 4),
    ),
  );
}
```

**What This Does:**
- Rebuilds the entire UI
- Clears local state
- Shows helpful message if browser cache still present

---

## 🎨 VISUAL GUIDE

### **What You'll See on Home Screen:**

**Top-Right Corner:**
```
┌─────────────┐
│      🔄     │ ← Purple floating button
└─────────────┘
```
- **Hover**: Tooltip shows "Refresh App"
- **Click**: Refreshes app and shows message
- **Color**: Purple (#9C27B0)

**Bottom-Right Corner:**
```
┌──────────┐
│  v2.0.0  │ ← Version badge
└──────────┘
```
- **Background**: Purple with 80% opacity
- **Text**: White, bold
- **Purpose**: Verify you have latest version

**Right Side:**
```
│
│
█ ← Purple scrollbar (16px wide)
│
│
```
- **Track**: Light purple, always visible
- **Thumb**: Dark purple, draggable
- **Size**: 16px wide (easy to see)

---

## 🐛 TROUBLESHOOTING

### **Problem: Still Don't See Games**

**Solution 1: Nuclear Option - Clear Everything**
1. Close **ALL** tabs with the site
2. Clear **ALL** browser data (Method B above)
3. Restart browser completely
4. Open in **Incognito/Private** mode
5. Visit site fresh

**Solution 2: Try Different Browser**
- Chrome: https://nihonselfpacepractic-flutter.web.app
- Firefox: https://nihonselfpacepractic-flutter.web.app
- Safari: https://nihonselfpacepractic-flutter.web.app
- Edge: https://nihonselfpacepractic-flutter.web.app

**Solution 3: Check Version**
- Look for **"v2.0.0"** badge at bottom-right
- If you see **v1.x.x** or no badge → Still cached
- If you see **v2.0.0** → You have latest

**Solution 4: Mobile Device**
- Clear app data for browser
- Try different browser (Chrome, Safari, Firefox)
- Use "Request Desktop Site" option

---

### **Problem: Refresh Button Doesn't Work**

**Answer:** The in-app refresh button only refreshes **Flutter state**, not browser cache.

**Solution:** Use browser's hard refresh:
```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

Or DevTools method:
1. F12 → Network tab
2. Check "Disable cache"
3. Right-click refresh → "Empty Cache and Hard Reload"

---

### **Problem: Version Shows v1.x.x or No Version**

**This means:** You have an old cached version.

**Solution:**
1. **Force clear cache** (see methods above)
2. **Close all tabs** with the site
3. **Restart browser**
4. **Open in Incognito** first to test

---

### **Problem: Still See Old Content After Everything**

**Possible Causes:**
1. **CDN Cache** - Firebase CDN might still serve old version
   - Wait 5-10 minutes for CDN to update
   - Try again after waiting

2. **ISP Cache** - Your internet provider might cache
   - Use VPN or mobile data to test
   - Try different network

3. **Service Worker** - Old service worker stuck
   - Open DevTools → Application → Service Workers
   - Click "Unregister" on any workers
   - Hard refresh again

---

## 📊 VERIFICATION CHECKLIST

Use this to verify you have the **latest version**:

### **Visual Checks:**
- [ ] See **purple refresh button** at top-right
- [ ] See **"v2.0.0" badge** at bottom-right
- [ ] See **purple scrollbar** on right side (16px wide)
- [ ] Scrollbar **track is visible** (not just thumb)

### **Functional Checks:**
- [ ] Can **click refresh button** (shows snackbar message)
- [ ] Can **scroll** with mouse wheel
- [ ] Can **drag scrollbar** thumb
- [ ] See **"🌸 日本語クエスト 🌸"** title

### **Navigation Checks:**
- [ ] See **4 buttons** on home (Kids Mode, Grammar, Adult, About)
- [ ] Click **"こどもモード"** opens game selection
- [ ] See **6 game cards** (5 playable + 1 coming soon)
- [ ] Each game card has **emoji icon** + **Japanese title**

### **Game Access:**
- [ ] Click **"ひらがなマッチ"** opens Hiragana game
- [ ] Click **"きおくゲーム"** opens Memory game
- [ ] Click **"もじをかこう"** opens Trace game
- [ ] Click **"スライドパズル"** opens Puzzle game
- [ ] Click **"はやくタップ"** opens Tap game

---

## 🎯 QUICK START GUIDE

**For First-Time Visitors:**

1. **Visit:** https://nihonselfpacepractic-flutter.web.app
2. **Look for:** v2.0.0 badge (bottom-right) and refresh button (top-right)
3. **If you don't see them:** Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
4. **Click:** Pink button "こどもモード" (Kids Mode)
5. **Play:** Choose any of the 5 games!

**For Returning Visitors:**

1. **Click refresh button** (top-right) when you visit
2. **Check version badge** says "v2.0.0"
3. **If outdated:** Use browser hard refresh
4. **Enjoy:** Play the games!

---

## 💡 TIPS FOR ALWAYS LATEST VERSION

### **Browser Settings:**

**Chrome/Edge:**
1. Settings → Privacy and security → Site settings
2. Find your site → Clear data
3. Or: Use "Disable cache" in DevTools (F12)

**Firefox:**
1. about:preferences#privacy
2. Cookies and Site Data → Manage Data
3. Search for your site → Remove

**Safari:**
1. Preferences → Privacy → Manage Website Data
2. Search for your site → Remove

### **Best Practice:**
- ✅ **Always hard refresh** first visit of the day
- ✅ **Use Incognito** for testing updates
- ✅ **Check version badge** to verify latest
- ✅ **Clear cache** if things look old

---

## 🚀 TECHNICAL DETAILS

### **Cache Headers Applied:**

| Header | Value | Purpose |
|--------|-------|---------|
| Cache-Control | no-cache, no-store, must-revalidate | Prevent caching |
| Pragma | no-cache | HTTP/1.0 compatibility |
| Expires | 0 | Mark as immediately expired |
| max-age | 0 | Cache lifetime = 0 seconds |

### **File Types Affected:**
- ✅ HTML files - Never cached
- ✅ JavaScript files - Never cached
- ✅ CSS files - Never cached
- ✅ JSON files - Never cached
- ⏱️ Images - Cached for 1 hour only

### **Why Images Are Cached:**
- Loading speed improvement
- Images don't change often
- Still refreshed every hour

---

## 📱 MOBILE NOTES

### **iOS (Safari/Chrome):**
- Tap refresh button to reload app state
- For full refresh: Hold reload button → "Request Desktop Site"
- Clear Safari cache: Settings → Safari → Clear History and Website Data

### **Android (Chrome/Firefox):**
- Tap refresh button to reload app state
- For full refresh: Chrome menu → Settings → Privacy → Clear browsing data
- Check "Cached images and files"

### **PWA (Installed App):**
- Uninstall and reinstall from browser
- Or: Visit site in browser, clear cache, then open PWA

---

## 📝 SUMMARY

**What Changed in v2.0.0:**
- ✅ Added **purple refresh button** (top-right)
- ✅ Added **version badge** (bottom-right showing v2.0.0)
- ✅ Implemented **aggressive cache busting** (server + client)
- ✅ Added **helpful snackbar** messages
- ✅ Server headers **prevent ALL caching**
- ✅ HTML meta tags **force fresh content**

**How to Access Games:**
1. Hard refresh browser (Ctrl/Cmd + Shift + R)
2. Verify v2.0.0 badge visible
3. Click "こどもモード" button
4. Choose from 5 available games

**Why This Works:**
- Server refuses to cache files
- Browser forced to fetch fresh
- UI helps users refresh manually
- Version badge confirms latest code

---

## ✅ SUCCESS CRITERIA

You'll know everything is working when:

✅ See **refresh button** (purple, top-right)  
✅ See **"v2.0.0"** badge (bottom-right)  
✅ See **purple scrollbar** (right side, thick)  
✅ Click **"こどもモード"** shows 6 game cards  
✅ Games **load and play** correctly  

---

**Status:** ✅ **DEPLOYED AND LIVE**  
**Version:** 2.0.0  
**Live URL:** https://nihonselfpacepractic-flutter.web.app  
**Updated:** June 29, 2026

---

**Need Help?**  
If you still don't see the games after following all steps:
1. Try **different browser** (Chrome, Firefox, Safari)
2. Try **Incognito/Private mode**
3. Wait **5-10 minutes** (CDN propagation)
4. Try **different device** (phone, tablet, another computer)
5. Check **browser console** for errors (F12 → Console tab)
