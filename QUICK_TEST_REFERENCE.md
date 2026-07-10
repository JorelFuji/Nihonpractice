# ⚡ QUICK TEST REFERENCE

**Quick commands for testing, linting, and CI checks**

---

## 🏃 QUICK COMMANDS

### **Run All Tests (Everything):**
```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace
npm run ci:all
```

### **Run Quick Tests (Web Only):**
```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace
npm run ci:quick
```

---

## 🌐 REACT WEB APP

### **Location:**
```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend
```

### **Commands:**
```bash
npm test              # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:coverage # Run with coverage
npm run lint          # Check code quality
npm run lint:fix      # Auto-fix issues
npm run type-check    # TypeScript check
npm run build         # Build production
npm run ci:local      # Full CI locally
```

---

## 📱 FLUTTER MOBILE APP

### **Location:**
```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile
```

### **Commands:**
```bash
flutter test                    # Run all tests
flutter test --coverage         # Run with coverage
flutter analyze                 # Static analysis
flutter format lib/             # Format code
flutter build web               # Build for web
flutter pub get                 # Install dependencies
```

---

## 🎯 SPECIFIC TEST FILES

### **React:**
```bash
# Test vocabulary data
npm test -- japaneseWords.test.ts

# Test routing
npm test -- routing.test.tsx

# Test app
npm test -- App.test.tsx
```

### **Flutter:**
```bash
# Test picture cards
flutter test test/models/picture_card_test.dart

# Test provider
flutter test test/providers/vocabulary_provider_test.dart
```

---

## ✅ VERIFICATION CHECKLIST

### **Before Commit:**
```bash
# 1. Run lint
npm run lint

# 2. Run type check
npm run type-check

# 3. Run tests
npm run test:run

# 4. Commit (husky will run automatically)
git add .
git commit -m "feat: your message"
```

### **Before Push:**
```bash
# 1. Run full CI
npm run ci:all

# 2. Push (husky will run automatically)
git push
```

---

## 🐛 QUICK FIXES

### **Reset React:**
```bash
cd nihon-quest-fullstack/frontend
rm -rf node_modules package-lock.json
npm install
```

### **Reset Flutter:**
```bash
cd nihon_quest_mobile
flutter clean
flutter pub get
```

### **Reset Husky:**
```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace
npx husky install
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

---

## 📊 VIEW COVERAGE

### **React:**
```bash
cd nihon-quest-fullstack/frontend
npm run test:coverage
open coverage/index.html
```

### **Flutter:**
```bash
cd nihon_quest_mobile
flutter test --coverage
genhtml coverage/lcov.info -o coverage/html
open coverage/html/index.html
```

---

## 🔍 CHECK ROUTES

### **Verify All Routes Work:**
```bash
# React routes (27 routes)
grep -r "Route path=" nihon-quest-fullstack/frontend/src/App.tsx

# Expected routes:
✅ /
✅ /vocabulary
✅ /vocabulary/:category
✅ /match-game
✅ /match-game/:category
✅ /flashcards/:category
✅ /kids-mode
✅ /grammar-game
✅ /sentence-game
✅ ... and 18 more
```

---

## 📝 STATUS CHECK

### **Check Everything:**
```bash
# From project root
echo "Checking Husky..."
ls -la .husky/

echo "\nChecking React setup..."
cd nihon-quest-fullstack/frontend && npm run lint && npm run type-check

echo "\nChecking Flutter setup..."
cd ../../nihon_quest_mobile && flutter analyze

echo "\nAll checks complete! ✅"
```

---

## 🎯 KEY FILES

### **Configuration:**
```
.husky/pre-commit                     # Pre-commit hook
.husky/pre-push                       # Pre-push hook
package.json                          # Root CI scripts
nihon-quest-fullstack/frontend/
  ├── package.json                    # React scripts
  ├── .eslintrc.cjs                   # ESLint config
  ├── vitest.config.ts                # Test config
  └── tsconfig.json                   # TypeScript config
nihon_quest_mobile/
  ├── pubspec.yaml                    # Flutter dependencies
  ├── analysis_options.yaml           # Flutter analysis
  └── test/                           # Test directory
```

### **Test Files:**
```
React Tests:
  src/tests/App.test.tsx
  src/tests/routing.test.tsx
  src/tests/japaneseWords.test.ts

Flutter Tests:
  test/models/picture_card_test.dart
  test/providers/vocabulary_provider_test.dart
```

---

## 🚨 COMMON ISSUES

### **"Tests not found"**
```bash
cd nihon-quest-fullstack/frontend
npm install
npm test
```

### **"ESLint not working"**
```bash
cd nihon-quest-fullstack/frontend
npm install eslint --save-dev
npm run lint
```

### **"Flutter test fails"**
```bash
cd nihon_quest_mobile
flutter pub get
flutter test
```

### **"Husky not running"**
```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace
npm install husky --save-dev
npx husky install
```

---

## ⏱️ TIME ESTIMATES

| Task | Time |
|------|------|
| React lint | ~10s |
| React type-check | ~15s |
| React tests | ~5s |
| React build | ~30s |
| Flutter analyze | ~5s |
| Flutter test | ~10s |
| **Full CI (all)** | **~6min** |
| **Quick CI (web)** | **~4min** |

---

## 🎉 SUCCESS CRITERIA

✅ All tests pass (44+ React, 50+ Flutter)  
✅ ESLint shows 0 errors  
✅ TypeScript check passes  
✅ Flutter analyze passes  
✅ Husky hooks execute on commit/push  
✅ All 27 routes render correctly  
✅ Coverage reports generate  

---

**Your testing setup is complete and ready to use! 🚀**
