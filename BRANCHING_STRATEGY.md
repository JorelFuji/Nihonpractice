# 🌿 Git Branching Strategy

## 📋 **Branch Structure**

### **Main Branches**

```
main
├── develop
├── feature/*
├── bugfix/*
├── hotfix/*
└── release/*
```

---

## 🎯 **Branch Types**

### **1. `main` - Production Branch**
- **Purpose:** Production-ready code only
- **Protected:** Yes
- **Deploy:** Automatic to Firebase
- **Merge from:** `release/*` or `hotfix/*` only

**Rules:**
- ✅ All tests must pass
- ✅ Code review required
- ✅ CI/CD checks must pass
- ✅ Health check must pass

### **2. `develop` - Development Branch**
- **Purpose:** Integration branch for features
- **Protected:** Yes
- **Deploy:** Staging environment
- **Merge from:** `feature/*` branches

**Rules:**
- ✅ Code review required
- ✅ Tests must pass
- ✅ Lint checks must pass

### **3. `feature/*` - Feature Branches**
- **Purpose:** New features and enhancements
- **Naming:** `feature/description-of-feature`
- **Branch from:** `develop`
- **Merge to:** `develop`

**Examples:**
```bash
feature/pokemon-game
feature/color-learning-module
feature/grammar-roadmap
feature/scrolling-improvements
```

**Workflow:**
```bash
# Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/new-feature

# Work on feature
git add .
git commit -m "Add new feature"

# Push and create PR
git push -u origin feature/new-feature
```

### **4. `bugfix/*` - Bug Fix Branches**
- **Purpose:** Fix bugs in develop branch
- **Naming:** `bugfix/description-of-bug`
- **Branch from:** `develop`
- **Merge to:** `develop`

**Examples:**
```bash
bugfix/fix-scroll-overflow
bugfix/grammar-display-error
bugfix/mobile-layout-issue
```

### **5. `hotfix/*` - Production Hotfix Branches**
- **Purpose:** Critical fixes for production
- **Naming:** `hotfix/critical-issue`
- **Branch from:** `main`
- **Merge to:** `main` AND `develop`

**Examples:**
```bash
hotfix/security-vulnerability
hotfix/critical-crash
hotfix/data-loss-bug
```

**Workflow:**
```bash
# Create hotfix
git checkout main
git pull origin main
git checkout -b hotfix/critical-issue

# Fix and test
git add .
git commit -m "Fix critical issue"

# Merge to main
git checkout main
git merge hotfix/critical-issue
git push origin main

# Merge to develop
git checkout develop
git merge hotfix/critical-issue
git push origin develop

# Delete hotfix branch
git branch -d hotfix/critical-issue
```

### **6. `release/*` - Release Branches**
- **Purpose:** Prepare for production release
- **Naming:** `release/v1.0.0`
- **Branch from:** `develop`
- **Merge to:** `main` AND `develop`

**Workflow:**
```bash
# Create release branch
git checkout develop
git checkout -b release/v1.0.0

# Final testing and bug fixes
# Update version numbers
# Update CHANGELOG.md

# Merge to main
git checkout main
git merge release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags

# Merge back to develop
git checkout develop
git merge release/v1.0.0
git push origin develop
```

---

## 📝 **Commit Message Convention**

### **Format**
```
<type>(<scope>): <subject>

<body>

<footer>
```

### **Types**
- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Code style changes (formatting)
- **refactor:** Code refactoring
- **perf:** Performance improvements
- **test:** Adding tests
- **chore:** Build process or auxiliary tool changes
- **ci:** CI/CD changes

### **Examples**
```bash
feat(grammar): Add N5 grammar roadmap
fix(mobile): Fix horizontal scroll overflow
docs(readme): Update installation instructions
style(components): Format code with prettier
refactor(api): Simplify Firebase queries
perf(images): Optimize image loading
test(auth): Add authentication tests
chore(deps): Update dependencies
ci(github): Add automated deployment workflow
```

---

## 🔄 **Workflow Examples**

### **Adding a New Feature**

```bash
# 1. Start from develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/pokemon-game

# 3. Work on feature
# ... make changes ...
git add .
git commit -m "feat(games): Add Pokemon-style learning game"

# 4. Push to remote
git push -u origin feature/pokemon-game

# 5. Create Pull Request on GitHub
# - Base: develop
# - Compare: feature/pokemon-game
# - Add description and screenshots
# - Request review

# 6. After approval, merge via GitHub
# 7. Delete branch
git checkout develop
git pull origin develop
git branch -d feature/pokemon-game
```

### **Fixing a Bug**

```bash
# 1. Create bugfix branch
git checkout develop
git checkout -b bugfix/scroll-overflow

# 2. Fix the bug
git add .
git commit -m "fix(layout): Fix horizontal scroll overflow on mobile"

# 3. Push and create PR
git push -u origin bugfix/scroll-overflow

# 4. Merge after review
```

### **Deploying to Production**

```bash
# 1. Create release branch
git checkout develop
git checkout -b release/v1.1.0

# 2. Update version and changelog
# Edit package.json version
# Update CHANGELOG.md

git add .
git commit -m "chore(release): Prepare v1.1.0 release"

# 3. Merge to main
git checkout main
git merge release/v1.1.0
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin main --tags

# 4. Merge back to develop
git checkout develop
git merge release/v1.1.0
git push origin develop

# 5. Delete release branch
git branch -d release/v1.1.0
```

---

## 🏷️ **Tagging Strategy**

### **Version Format**
```
v<major>.<minor>.<patch>
```

**Examples:**
- `v1.0.0` - Initial release
- `v1.1.0` - New features
- `v1.1.1` - Bug fixes
- `v2.0.0` - Breaking changes

### **Creating Tags**

```bash
# Annotated tag (recommended)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag
git push origin v1.0.0

# Push all tags
git push origin --tags

# List tags
git tag -l

# Delete tag
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

---

## 🔒 **Branch Protection Rules**

### **`main` Branch**
- ✅ Require pull request reviews (1 reviewer)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Include administrators
- ✅ Restrict who can push

### **`develop` Branch**
- ✅ Require pull request reviews (1 reviewer)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date

---

## 📊 **Current Branches**

### **Active Branches**
```
main                                    # Production
develop                                 # Development (to be created)
scrolling-improvements-and-games        # Current feature branch
```

### **Branch Setup Commands**

```bash
# Create develop branch
git checkout main
git checkout -b develop
git push -u origin develop

# Set develop as default branch for PRs (on GitHub)
# Settings → Branches → Default branch → develop
```

---

## 🎯 **Best Practices**

### **DO:**
- ✅ Branch from `develop` for features
- ✅ Use descriptive branch names
- ✅ Keep branches focused and small
- ✅ Commit often with clear messages
- ✅ Pull latest changes before creating branch
- ✅ Delete branches after merging
- ✅ Use pull requests for all merges
- ✅ Write meaningful PR descriptions

### **DON'T:**
- ❌ Commit directly to `main`
- ❌ Commit directly to `develop`
- ❌ Create long-lived feature branches
- ❌ Mix multiple features in one branch
- ❌ Force push to shared branches
- ❌ Merge without review
- ❌ Leave stale branches

---

## 🚀 **Quick Reference**

### **Create Feature Branch**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-feature
```

### **Update Feature Branch**
```bash
git checkout feature/my-feature
git fetch origin
git rebase origin/develop
```

### **Merge Feature to Develop**
```bash
# Use GitHub Pull Request (recommended)
# Or manually:
git checkout develop
git merge --no-ff feature/my-feature
git push origin develop
git branch -d feature/my-feature
```

### **Deploy to Production**
```bash
git checkout main
git merge develop
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main --tags
```

---

## 📈 **Workflow Diagram**

```
main (production)
  ↑
  └── release/v1.0.0
        ↑
        └── develop (integration)
              ↑
              ├── feature/pokemon-game
              ├── feature/grammar-roadmap
              ├── bugfix/scroll-issue
              └── feature/health-monitoring

hotfix/critical-bug
  ↓
main + develop
```

---

## ✅ **Summary**

- **`main`** - Production only
- **`develop`** - Integration branch
- **`feature/*`** - New features
- **`bugfix/*`** - Bug fixes
- **`hotfix/*`** - Critical production fixes
- **`release/*`** - Release preparation

**Always use Pull Requests!** 🎯
