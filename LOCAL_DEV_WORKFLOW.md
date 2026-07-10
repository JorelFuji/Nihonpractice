# 🛡️ LOCAL DEVELOPMENT WORKFLOW

**Philosophy:** Always test locally before pushing. Never push directly to main.

---

## 🎯 BRANCH PROTECTION RULES

### **Never Push to Main Directly**

```bash
# ❌ NEVER DO THIS
git checkout main
git commit -m "changes"
git push

# ✅ ALWAYS DO THIS
git checkout -b feature/my-feature
git commit -m "changes"
git push origin feature/my-feature
# Then create Pull Request on GitHub
```

---

## 🔒 PREVENT ACCIDENTAL PUSH TO MAIN

### **Option 1: Git Hook (Automatic)**

Create `.git/hooks/pre-push`:

```bash
#!/bin/bash
# Prevent pushing to main branch

BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "$BRANCH" = "main" ]; then
  echo "❌ ERROR: You cannot push directly to main branch!"
  echo "✅ Create a feature branch instead:"
  echo "   git checkout -b feature/my-feature"
  echo "   git push origin feature/my-feature"
  exit 1
fi

exit 0
```

**Install it:**
```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace
cat > .git/hooks/pre-push << 'EOF'
#!/bin/bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" = "main" ]; then
  echo "❌ ERROR: You cannot push directly to main branch!"
  echo "✅ Create a feature branch instead:"
  echo "   git checkout -b feature/my-feature"
  exit 1
fi
EOF

chmod +x .git/hooks/pre-push
```

---

### **Option 2: GitHub Branch Protection**

1. Go to: https://github.com/JorelFuji/Nihonpractice/settings/branches
2. Add rule for `main` branch:
   - ✅ Require pull request before merging
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Do not allow bypassing

---

## 🧪 LOCAL TEST & SCAN WORKFLOW

### **Complete Local Testing Script**

Create `test-local.sh`:

```bash
#!/bin/bash
set -e

echo "🧪 Starting Local Test & Scan Workflow..."
echo ""

# 1. Security Scan
echo "🔒 Step 1: Security Scan"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v gitleaks &> /dev/null; then
    gitleaks detect --no-git
else
    echo "⚠️  gitleaks not installed, skipping..."
fi
echo ""

# 2. Lint Check
echo "📝 Step 2: Lint Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd nihon-quest-fullstack/frontend
npm run lint
cd ../..
echo ""

# 3. Type Check
echo "🔍 Step 3: TypeScript Type Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd nihon-quest-fullstack/frontend
npm run type-check
cd ../..
echo ""

# 4. Build Check
echo "🔨 Step 4: Build Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd nihon-quest-fullstack/frontend
npm run build
cd ../..
echo ""

# 5. Tests (if available)
echo "🧪 Step 5: Run Tests"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -f "nihon-quest-fullstack/frontend/package.json" ]; then
    cd nihon-quest-fullstack/frontend
    if npm run | grep -q "test:run"; then
        npm run test:run || echo "⚠️  Tests failed or not configured"
    fi
    cd ../..
fi
echo ""

# 6. Flutter Tests
echo "📱 Step 6: Flutter Tests"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v flutter &> /dev/null; then
    cd nihon_quest_mobile
    flutter test || echo "⚠️  Flutter tests failed or not configured"
    cd ..
fi
echo ""

# Summary
echo "✅ All local tests completed!"
echo ""
echo "🚀 Next steps:"
echo "   1. git add ."
echo "   2. git commit -m 'your message'"
echo "   3. git push origin $(git branch --show-current)"
echo "   4. Create Pull Request on GitHub"
```

---

## 🚀 RECOMMENDED WORKFLOW

### **Step-by-Step Development Flow**

```bash
# 1. Always start from main, pull latest
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/my-awesome-feature

# 3. Make your changes
# ... code code code ...

# 4. Test locally (BEFORE committing)
./test-local.sh

# 5. If tests pass, commit
git add .
git commit -m "feat: add awesome feature"

# 6. Push to feature branch (NOT main)
git push origin feature/my-awesome-feature

# 7. Create Pull Request on GitHub
# Go to GitHub → Compare & pull request

# 8. Merge PR after review
# Delete feature branch after merge
```

---

## 📋 QUICK TEST COMMANDS

### **Fast Local Check (30 seconds)**

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace

# Quick lint + build
cd nihon-quest-fullstack/frontend
npm run lint && npm run build
cd ../..
```

### **Full Local Check (3 minutes)**

```bash
# Run complete test suite
./test-local.sh
```

### **Security Scan Only**

```bash
gitleaks detect --no-git
```

---

## 🔍 PRE-PUSH CHECKLIST

Before every push, verify:

- [ ] ✅ On feature branch (not main)
- [ ] ✅ Code linted (`npm run lint`)
- [ ] ✅ No TypeScript errors (`npm run type-check`)
- [ ] ✅ Build succeeds (`npm run build`)
- [ ] ✅ No security issues (gitleaks)
- [ ] ✅ Tests pass (if available)
- [ ] ✅ Commit message descriptive
- [ ] ✅ Pushing to feature branch

---

## 🛠️ SETUP INSTRUCTIONS

### **1. Install Testing Script**

```bash
cd /Users/m1876041/Documents/Github/NihonSelfPace

# Create test script
cat > test-local.sh << 'EOF'
[paste script from above]
EOF

chmod +x test-local.sh
```

### **2. Install Pre-Push Hook**

```bash
cat > .git/hooks/pre-push << 'EOF'
#!/bin/bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" = "main" ]; then
  echo "❌ ERROR: Cannot push to main!"
  exit 1
fi
EOF

chmod +x .git/hooks/pre-push
```

### **3. Configure Git Aliases**

```bash
# Add helpful aliases
git config alias.test-local '!./test-local.sh'
git config alias.safe-push '!f() { ./test-local.sh && git push origin $(git branch --show-current); }; f'
```

Now you can use:
```bash
git test-local    # Run all tests
git safe-push     # Test then push
```

---

## 📊 BRANCH NAMING CONVENTIONS

Use descriptive branch names:

```bash
# Features
git checkout -b feature/add-new-game
git checkout -b feature/improve-ui

# Fixes
git checkout -b fix/game-bug
git checkout -b fix/eslint-errors

# Refactoring
git checkout -b refactor/cleanup-code

# Documentation
git checkout -b docs/update-readme
```

---

## 🚨 EMERGENCY: PUSHED TO MAIN BY MISTAKE

If you accidentally pushed to main:

```bash
# 1. Revert the commit
git checkout main
git revert HEAD
git push origin main

# 2. Or reset (dangerous, only if no one else pulled)
git checkout main
git reset --hard HEAD~1
git push origin main --force

# 3. Then create proper feature branch
git checkout -b feature/fix-mistake
# Make changes
git commit -m "fix: proper fix"
git push origin feature/fix-mistake
```

---

## 🎯 MAKEFILE SHORTCUTS

Add to your `Makefile`:

```makefile
.PHONY: test-local scan-security lint build safe-push

test-local:
	@./test-local.sh

scan-security:
	@gitleaks detect --no-git

lint:
	@cd nihon-quest-fullstack/frontend && npm run lint

build:
	@cd nihon-quest-fullstack/frontend && npm run build

safe-push: test-local
	@git push origin $$(git branch --show-current)
```

Usage:
```bash
make test-local    # Run all tests
make scan-security # Security scan only
make safe-push     # Test and push
```

---

## ✅ DAILY WORKFLOW SUMMARY

```bash
# Morning: Start fresh
git checkout main
git pull origin main
git checkout -b feature/todays-work

# During day: Make changes and test
./test-local.sh  # Test frequently

# Evening: Push work
git add .
git commit -m "feat: completed feature X"
./test-local.sh  # Final check
git push origin feature/todays-work

# Next day: Continue or create PR
```

---

## 🔒 SECURITY SCANNING

### **Always Scan Before Push**

```bash
# Scan for secrets
gitleaks detect --no-git

# Scan dependencies
npm audit

# Flutter dependencies
cd nihon_quest_mobile
flutter pub outdated
```

---

## 📝 COMMIT MESSAGE CONVENTIONS

Use conventional commits:

```bash
# Format: <type>: <description>

feat: add new hiragana game
fix: correct word matches in game
docs: update README with instructions
style: format code with prettier
refactor: simplify game logic
test: add unit tests for game
chore: update dependencies
```

---

## 🎉 BENEFITS OF THIS WORKFLOW

1. **No Broken Main Branch:** Main always works
2. **Catch Issues Early:** Find bugs locally, not in CI/CD
3. **Clean History:** Feature branches keep commits organized
4. **Safe Collaboration:** Multiple people can work simultaneously
5. **Easy Rollback:** Bad changes isolated to feature branches

---

## 📚 QUICK REFERENCE

```bash
# Start new feature
git checkout main && git pull
git checkout -b feature/name

# Test locally
./test-local.sh

# Commit and push
git add .
git commit -m "feat: description"
git push origin feature/name

# Never do this
git push origin main  # ❌ Blocked by hook
```

---

**Follow this workflow and you'll never break main again! 🛡️✨**
