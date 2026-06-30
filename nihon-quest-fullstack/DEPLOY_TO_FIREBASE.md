# 🚀 Deploy to Firebase - Complete Guide

## ✅ **Pre-Deployment Checklist**

Before deploying, ensure:
- ✅ All new components are created
- ✅ Grammar roadmap integrated
- ✅ Particles module integrated
- ✅ SOV practice game working
- ✅ No TypeScript errors
- ✅ Build completes successfully

---

## 📋 **Quick Deploy Steps**

### **Option 1: Automated Script (Recommended)**

```bash
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack/frontend
chmod +x deploy.sh
./deploy.sh
```

### **Option 2: Manual Steps**

```bash
# 1. Navigate to frontend directory
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack/frontend

# 2. Install dependencies (if needed)
npm install

# 3. Build the project
npm run build

# 4. Deploy to Firebase
firebase deploy --only hosting
```

---

## 🔧 **Detailed Deployment Process**

### **Step 1: Verify Firebase CLI**

Check if Firebase CLI is installed:
```bash
firebase --version
```

If not installed:
```bash
npm install -g firebase-tools
```

Login to Firebase:
```bash
firebase login
```

### **Step 2: Check Project Configuration**

Verify Firebase project:
```bash
cd frontend
firebase projects:list
```

Check current project:
```bash
firebase use
```

If needed, set project:
```bash
firebase use nihonselfpacepractic
```

### **Step 3: Build the Project**

```bash
# Clean previous build (optional)
rm -rf dist

# Install dependencies
npm install

# Build for production
npm run build
```

**Expected output:**
- TypeScript compilation successful
- Vite build completes
- `dist/` folder created with optimized files

### **Step 4: Test Build Locally (Optional)**

```bash
npm run preview
```

This will serve the production build locally at `http://localhost:4173`

Test:
- Grammar Roadmap loads
- Particles module works
- SOV practice game functions
- All tabs navigate correctly
- Mobile responsive design works

### **Step 5: Deploy to Firebase**

```bash
firebase deploy --only hosting
```

**Expected output:**
```
=== Deploying to 'nihonselfpacepractic'...

i  deploying hosting
i  hosting[nihonselfpacepractic]: beginning deploy...
i  hosting[nihonselfpacepractic]: found X files in dist
✔  hosting[nihonselfpacepractic]: file upload complete
i  hosting[nihonselfpacepractic]: finalizing version...
✔  hosting[nihonselfpacepractic]: version finalized
i  hosting[nihonselfpacepractic]: releasing new version...
✔  hosting[nihonselfpacepractic]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/nihonselfpacepractic/overview
Hosting URL: https://nihonselfpacepractic.web.app
```

---

## 🧪 **Post-Deployment Testing**

### **1. Access the Live Site**

Open: `https://nihonselfpacepractic.web.app/`

### **2. Test New Features**

#### **Grammar Roadmap**
- [ ] Click "🗺️ Grammar Roadmap" in sidebar
- [ ] Select N5 level
- [ ] Check a grammar point
- [ ] Verify progress saves (refresh page)
- [ ] Switch to N4, N3, N2, N1 levels
- [ ] Test conversation drills tab
- [ ] Check progress dashboard

#### **Particles Module**
- [ ] Select "Particles" module from sidebar
- [ ] Navigate through 8 particle lessons
- [ ] Read rationale and examples
- [ ] Complete practice exercises
- [ ] Test SOV particle practice game
- [ ] Drag and drop word tiles
- [ ] Check answer feedback
- [ ] Try all 5 exercises

#### **Responsive Design**
- [ ] Test on mobile (< 640px)
- [ ] Test on tablet (640px - 1024px)
- [ ] Test on desktop (1024px+)
- [ ] Verify hamburger menu on mobile
- [ ] Check text auto-fitting
- [ ] Test touch interactions

#### **Existing Features**
- [ ] Numbers module works
- [ ] Time module works
- [ ] Days/Months modules work
- [ ] Hiragana chart displays
- [ ] Katakana chart displays
- [ ] Skill checkoffs function
- [ ] Language toggles work

### **3. Browser Testing**

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Mobile browsers

### **4. Performance Check**

Open DevTools → Lighthouse:
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

---

## 🐛 **Troubleshooting**

### **Build Errors**

**Error: TypeScript compilation failed**
```bash
# Check for type errors
npm run lint

# Fix import paths
# Ensure all new files are properly imported
```

**Error: Module not found**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build
```

### **Deployment Errors**

**Error: Firebase project not found**
```bash
# Login again
firebase login

# List projects
firebase projects:list

# Use correct project
firebase use nihonselfpacepractic
```

**Error: Permission denied**
```bash
# Re-authenticate
firebase login --reauth
```

**Error: Build folder not found**
```bash
# Ensure build completed
npm run build

# Check dist folder exists
ls -la dist/
```

### **Runtime Errors (After Deploy)**

**Grammar Roadmap not showing**
- Check browser console for errors
- Verify `grammarRoadmap.ts` is imported correctly
- Check `GrammarRoadmapView.tsx` component renders

**LocalStorage not persisting**
- Check browser privacy settings
- Verify localStorage is enabled
- Test in incognito mode

**Mobile layout broken**
- Check Tailwind CSS classes
- Verify responsive breakpoints
- Test with Chrome DevTools mobile emulation

---

## 📊 **Deployment Checklist**

### **Before Deploy**
- [ ] All files saved
- [ ] No TypeScript errors
- [ ] `npm run build` succeeds
- [ ] Local preview works (`npm run preview`)
- [ ] Git committed (optional but recommended)

### **During Deploy**
- [ ] Firebase CLI authenticated
- [ ] Correct project selected
- [ ] Build folder (`dist/`) exists
- [ ] Deploy command runs without errors

### **After Deploy**
- [ ] Live site loads
- [ ] Grammar roadmap accessible
- [ ] Particles module works
- [ ] SOV practice game functions
- [ ] Progress saves correctly
- [ ] Mobile responsive
- [ ] All existing features work

---

## 🔄 **Re-Deploy Process**

For future updates:

```bash
cd frontend
npm run build
firebase deploy --only hosting
```

Or use the automated script:
```bash
./deploy.sh
```

---

## 📱 **Testing URLs**

### **Production**
- **Main URL**: https://nihonselfpacepractic.web.app/
- **Alternative**: https://nihonselfpacepractic.firebaseapp.com/

### **Direct Links to Test**
- Grammar Roadmap: Click sidebar → "🗺️ Grammar Roadmap"
- Particles: Click sidebar → "Particles" module
- SOV Practice: In Particles module → scroll to interactive practice
- Hiragana: Click sidebar → "ひらがな表"
- Katakana: Click sidebar → "カタカナ表"

---

## 💾 **Backup & Rollback**

### **Before Major Deploys**

```bash
# List hosting versions
firebase hosting:channel:list

# Create a backup
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID TARGET_SITE_ID:live
```

### **Rollback if Needed**

```bash
# View previous versions
firebase hosting:releases:list

# Rollback to previous version (if needed)
# This requires manual action in Firebase Console
```

**Manual Rollback:**
1. Go to Firebase Console
2. Navigate to Hosting
3. Click "Release history"
4. Find previous working version
5. Click "Rollback"

---

## 🎯 **What to Test After Deploy**

### **Critical Features (Must Work)**
1. ✅ Site loads without errors
2. ✅ Grammar Roadmap displays all levels
3. ✅ Checkboxes save progress
4. ✅ Particles module shows all 8 lessons
5. ✅ SOV practice game is interactive
6. ✅ Mobile menu works
7. ✅ Language toggles function

### **Important Features (Should Work)**
1. ✅ All existing modules load
2. ✅ Hiragana/Katakana charts display
3. ✅ Skill checkoffs function
4. ✅ Examples show word breakdowns
5. ✅ Practice exercises work
6. ✅ Responsive design on all devices

### **Nice-to-Have Features (Good if Working)**
1. ✅ Smooth animations
2. ✅ Hover effects on desktop
3. ✅ Fast page load times
4. ✅ No console errors
5. ✅ Perfect mobile layout

---

## 📈 **Performance Optimization**

### **Already Optimized**
- ✅ Vite build with code splitting
- ✅ Lazy loading components
- ✅ Optimized images
- ✅ Minified CSS/JS
- ✅ Cache headers configured

### **Monitor After Deploy**
- Page load time
- Time to interactive
- First contentful paint
- Largest contentful paint

Use: Chrome DevTools → Lighthouse → Run audit

---

## 🔐 **Security Notes**

- ✅ No API keys in frontend code
- ✅ Firebase security rules configured
- ✅ HTTPS enforced
- ✅ No sensitive data in localStorage
- ✅ XSS protection via React

---

## 📞 **Support**

If deployment fails:

1. **Check Firebase Status**: https://status.firebase.google.com/
2. **Review Console Logs**: Check terminal output
3. **Firebase Console**: https://console.firebase.google.com/
4. **Clear Cache**: Try `firebase deploy --only hosting --force`

---

## 🎉 **Success Indicators**

You'll know deployment succeeded when:

✅ Terminal shows "Deploy complete!"  
✅ Hosting URL is displayed  
✅ Live site loads at https://nihonselfpacepractic.web.app/  
✅ Grammar Roadmap is accessible  
✅ Particles module works  
✅ SOV practice game functions  
✅ Progress saves across page refreshes  
✅ Mobile layout looks good  
✅ No console errors  

**Ready to deploy! Run the commands above and test thoroughly.** 🚀
