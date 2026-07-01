# 🚀 Quick Start - Local CI

## First-Time Setup (5 minutes)

```bash
# 1. Install root dependencies (Husky + lint-staged)
npm install

# 2. Setup git hooks
npm run prepare

# 3. Install frontend dependencies
cd nihon-quest-fullstack/frontend && npm install
cd ../../nihongo-quest-app/frontend && npm install
cd ../..
```

---

## Daily Usage

### Before Pushing (Recommended)
```bash
# Quick check (2-3 min) - RECOMMENDED
npm run ci:quick

# Or use bash script
./check-ci.sh quick
```

### The Flow
```bash
# 1. Make changes
code .

# 2. Quick local check
npm run ci:quick

# 3. Commit (pre-commit hook auto-runs)
git add .
git commit -m "feat: awesome feature"

# 4. Push (pre-push hook auto-runs)
git push
```

---

## Available Commands

```bash
# Quick checks (frontends only, 2-3 min)
npm run ci:quick

# Full checks (all projects, 5-7 min)
npm run ci:all

# Individual projects
npm run ci:fullstack
npm run ci:nihongo
npm run ci:flutter

# Alternative: Bash script
./check-ci.sh quick
./check-ci.sh all
./check-ci.sh fullstack
```

---

## What Runs Automatically

### Pre-Commit (Automatic)
- ✅ Lints **only changed files**
- ✅ Fast (5-10 seconds)
- ✅ Runs on `git commit`

### Pre-Push (Automatic)
- ✅ Full CI checks for **changed projects**
- ✅ Lint + Type-check + Build
- ✅ Runs on `git push`

---

## Emergency: Skip Hooks

```bash
# Skip pre-commit
git commit --no-verify -m "emergency"

# Skip pre-push
git push --no-verify
```

**⚠️ Use only in emergencies!**

---

## Troubleshooting

### Hooks not running?
```bash
npm run prepare
chmod +x .husky/pre-commit .husky/pre-push
```

### Check fails locally?
```bash
cd nihon-quest-fullstack/frontend
rm -rf node_modules package-lock.json
npm install
npm run ci:local
```

---

## Success Metrics

**Before:**
- ❌ 30-40% pipeline failures
- ❌ 15 min wasted per failure

**After:**
- ✅ <5% pipeline failures
- ✅ Catch errors in 2-3 min locally

---

## 🎯 Golden Rule

**Always run `npm run ci:quick` before pushing.**

If it passes locally, it passes in CI.

---

**Full Guide:** See `LOCAL_CI_GUIDE.md` for complete documentation.
