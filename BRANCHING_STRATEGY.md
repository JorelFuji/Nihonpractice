# Branch Naming & Git Workflow Strategy

**Repository:** NihonSelfPace (Japanese Learning Platform)  
**Last Updated:** 2026-07-01  
**Strategy:** GitHub Flow (Simplified for rapid development)

---

## 📋 Table of Contents

- [Branch Structure](#branch-structure)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Workflow Guide](#workflow-guide)
- [Branch Protection Rules](#branch-protection-rules)
- [Common Commands](#common-commands)
- [Best Practices](#best-practices)
- [Commit Message Standards](#commit-message-standards)
- [Troubleshooting](#troubleshooting)

---

## 🌳 Branch Structure

### Long-Lived Branches (Never Delete)

```
main
├── Production-ready code
├── Tagged with versions (v1.0.0, v1.1.0, etc.)
├── Deployed to Firebase Hosting (Production)
└── Always stable and deployable

develop (optional for larger teams)
├── Integration branch for features
├── Base for all feature branches
└── Deployed to development environment
```

### Short-Lived Branches (Deleted After Merge)

```
feature/*      - New features and enhancements
bugfix/*       - Bug fixes
hotfix/*       - Critical production fixes
chore/*        - Maintenance tasks (dependencies, configs)
docs/*         - Documentation updates
refactor/*     - Code refactoring
test/*         - Testing improvements
ci/*           - CI/CD pipeline updates
```

---

## 🏷️ Branch Naming Conventions

### Format
```
<type>/<description>
```

### Naming Rules

✅ **DO:**
- Use lowercase for consistency
- Use hyphens to separate words (not underscores or spaces)
- Keep it concise but descriptive (30 characters or less)
- Be specific about what the branch does
- Reference issue numbers when applicable

❌ **DON'T:**
- Use confusing abbreviations
- Use special characters (except hyphens)
- Use generic names like `fix` or `update`

---

## 📝 Branch Types & Examples

### Feature Branches
**Purpose:** New features and enhancements

```bash
feature/memory-match-game
feature/japanese-vocabulary-dictionary
feature/kids-mode-enhancement
feature/user-authentication
feature/firebase-integration
feature/ai-chat-assistant
feature/progressive-curriculum
feature/issue-123-add-kanji-practice
```

### Bugfix Branches
**Purpose:** Non-critical bug fixes

```bash
bugfix/login-error-handling
bugfix/memory-game-scoring
bugfix/character-display-issue
bugfix/navigation-broken-link
bugfix/issue-456-fix-audio-sync
```

### Hotfix Branches
**Purpose:** Critical production issues

```bash
hotfix/security-vulnerability
hotfix/payment-processing-error
hotfix/data-loss-prevention
hotfix/critical-crash-fix
```

### Chore Branches
**Purpose:** Maintenance tasks

```bash
chore/update-dependencies
chore/upgrade-flutter-version
chore/refactor-firebase-config
chore/clean-up-unused-files
chore/optimize-bundle-size
```

### Documentation Branches
**Purpose:** Documentation updates

```bash
docs/readme-setup-instructions
docs/api-documentation
docs/deployment-guide
docs/branching-strategy
docs/learning-rules-page
```

### Refactoring Branches
**Purpose:** Code improvements without changing functionality

```bash
refactor/components-structure
refactor/database-queries
refactor/authentication-module
refactor/game-logic-cleanup
```

### Test Branches
**Purpose:** Testing improvements

```bash
test/add-unit-tests
test/e2e-testing-setup
test/load-testing
test/memory-game-tests
```

### CI/CD Branches
**Purpose:** CI/CD pipeline improvements

```bash
ci/github-actions-setup
ci/firebase-deployment
ci/automated-testing
ci/docker-configuration
```

---

## 🔄 Workflow Guide

### Initial Setup

#### 1. Clone Repository
```bash
git clone https://github.com/JorelFuji/Nihonpractice.git
cd NihonSelfPace
```

#### 2. Set Default Tracking Branch
```bash
git config --global push.default current
```

---

## 🚀 Feature Development Workflow

### Step 1: Create Feature Branch from main

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name
```

**Example:**
```bash
git checkout -b feature/japanese-vocabulary-expansion
```

---

### Step 2: Make Changes & Commit

```bash
# Make your changes to files

# Stage changes
git add .

# Or stage specific files
git add path/to/file1 path/to/file2

# Commit with conventional commit message
git commit -m "feat: add hiragana practice mode

- Add 46 hiragana characters
- Include audio pronunciation
- Add interactive quiz
- Implement progress tracking"
```

---

### Step 3: Push to Remote

```bash
# First push (set upstream)
git push -u origin feature/your-feature-name

# Subsequent pushes
git push
```

---

### Step 4: Create Pull Request

1. Go to: https://github.com/JorelFuji/Nihonpractice/pulls
2. Click **"New Pull Request"**
3. Set **base branch** to `main`
4. Set **compare branch** to your `feature/your-feature-name`
5. Fill in:
   - **Title:** Brief description (e.g., "Add Hiragana Practice Mode")
   - **Description:** Detailed explanation of changes
   - **Related Issues:** Link any related issues
6. Request reviewers (if working in a team)
7. Click **"Create Pull Request"**

---

### Step 5: After Review & Approval

```bash
# Merge via GitHub UI (recommended)
# OR via CLI:

git checkout main
git pull origin main
git merge feature/your-feature-name
git push origin main

# Delete local branch
git branch -d feature/your-feature-name

# Delete remote branch
git push origin --delete feature/your-feature-name
```

---

## 🔥 Hotfix Workflow (Critical Production Bug)

### Step 1: Create Hotfix Branch from main

```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug-description
```

**Example:**
```bash
git checkout -b hotfix/memory-game-crash
```

---

### Step 2: Fix & Test

```bash
# Make your fixes
git add .
git commit -m "fix: resolve memory game crash on iOS

- Fix null pointer exception
- Add error handling
- Update test coverage"

git push -u origin hotfix/critical-bug-description
```

---

### Step 3: Create PR to main

- **Base:** `main`
- **Compare:** `hotfix/critical-bug-description`
- **Title:** "Hotfix: [Description]"
- **Label:** Add "urgent" or "hotfix" label
- Request urgent review

---

### Step 4: Merge & Tag

```bash
git checkout main
git pull origin main
git merge hotfix/critical-bug-description

# Tag the hotfix
git tag -a v1.0.1 -m "Hotfix: resolve memory game crash"
git push origin main v1.0.1

# Delete hotfix branch
git branch -d hotfix/critical-bug-description
git push origin --delete hotfix/critical-bug-description
```

---

## 🛡️ Branch Protection Rules

Configure on GitHub Settings → Branches → Add Rule:

### For `main` Branch

```
✓ Require a pull request before merging
  ✓ Require approvals: 1
  ✓ Require status checks to pass before merging
    - CI/CD tests must pass
    - Build succeeds
  ✓ Require branches to be up to date before merging
  ✓ Include administrators (optional)

✓ Restrict who can push to main
✓ Auto-delete head branches after merge
```

---

## 🔧 Common Commands

### View All Branches

```bash
# Local branches
git branch

# Remote branches
git branch -r

# All branches (local + remote)
git branch -a
```

---

### Switch Branches

```bash
# Switch to existing branch
git checkout branch-name

# Create and switch to new branch
git checkout -b new-branch-name
```

---

### Sync with Remote

```bash
# Fetch latest changes
git fetch origin

# Pull changes
git pull origin branch-name

# Pull and rebase
git pull --rebase origin branch-name
```

---

### Delete Branches

```bash
# Delete local branch (safe)
git branch -d branch-name

# Force delete local branch
git branch -D branch-name

# Delete remote branch
git push origin --delete branch-name
```

---

### Rename Branches

```bash
# Rename current branch
git branch -m new-name

# Rename specific branch
git branch -m old-name new-name

# Push renamed branch
git push origin new-name

# Delete old remote branch
git push origin --delete old-name
```

---

### View Commit History

```bash
# Pretty log
git log --graph --oneline --all --decorate

# Last 10 commits
git log --oneline -10

# Commits on specific branch
git log feature/branch-name
```

---

## ✅ Best Practices

### DO ✅

- ✅ Keep branches focused on a single task
- ✅ Create branches from the correct base branch (usually `main`)
- ✅ Use descriptive names that explain the purpose
- ✅ Delete branches after merging to keep repo clean
- ✅ Pull latest changes before creating new branches
- ✅ Make atomic commits with clear messages
- ✅ Keep branches up to date with their base branch
- ✅ Request reviews before merging (if team)
- ✅ Test thoroughly before pushing
- ✅ Tag releases with version numbers

### DON'T ❌

- ❌ Don't work directly on `main`
- ❌ Don't use confusing abbreviations in branch names
- ❌ Don't use special characters (except hyphens)
- ❌ Don't commit directly to protected branches
- ❌ Don't leave stale branches (cleanup after merging)
- ❌ Don't push large binary files to version control
- ❌ Don't rebase shared/public branches
- ❌ Don't ignore CI/CD check failures
- ❌ Don't merge without testing
- ❌ Don't create branches from old commits

---

## 📜 Commit Message Standards

Use **conventional commits** for clarity and automation:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

```
feat:     New feature
fix:      Bug fix
docs:     Documentation changes
style:    Code style changes (formatting, semicolons, etc.)
refactor: Code refactoring without changing functionality
perf:     Performance improvements
chore:    Maintenance tasks (dependencies, configs)
test:     Add or update tests
ci:       CI/CD configuration changes
build:    Build system changes
revert:   Revert a previous commit
```

### Examples

#### Simple Commit
```bash
git commit -m "feat: add hiragana practice mode"
```

#### Detailed Commit
```bash
git commit -m "feat: add memory match game with japanese vocabulary

- Implement 7 learning categories (Food, Animals, Colors, etc.)
- Add random word selection from 70+ word dictionary
- Include visual learning with emoji representations
- Add high score tracking with localStorage
- Create responsive design for mobile devices

Closes #123"
```

#### Bug Fix
```bash
git commit -m "fix: resolve memory game crash on card flip

The game was crashing when flipping cards rapidly due to
race condition in state management. Added debounce logic
to prevent multiple simultaneous flips.

Fixes #456"
```

#### Documentation
```bash
git commit -m "docs: add branching strategy guide"
```

#### Chore
```bash
git commit -m "chore: update firebase dependencies to v10.7.1"
```

---

## 🆘 Troubleshooting

### I accidentally committed to the wrong branch

```bash
# Create correct branch from current state
git branch correct-branch

# Reset current branch to before the commit
git reset --hard origin/main

# Switch to correct branch
git checkout correct-branch
```

---

### I need to merge main into my feature branch

```bash
git checkout feature/your-feature
git fetch origin
git merge origin/main

# Fix any conflicts, then push
git add .
git commit -m "merge: resolve conflicts with main"
git push origin feature/your-feature
```

---

### My branch is behind main

```bash
git checkout feature/your-feature
git fetch origin

# Option 1: Merge
git merge origin/main

# Option 2: Rebase (cleaner history)
git rebase origin/main
```

---

### I want to see what changed between branches

```bash
# Compare branches
git diff main..feature/your-feature

# See files changed
git diff --name-only main..feature/your-feature
```

---

### I need to undo my last commit

```bash
# Undo commit but keep changes
git reset --soft HEAD~1

# Undo commit and discard changes (DANGEROUS)
git reset --hard HEAD~1
```

---

## 📊 Current Repository Structure

```
NihonSelfPace/
├── main (production)
│   ├── firebase-hosting/
│   │   ├── public/
│   │   │   ├── games/
│   │   │   │   ├── memory-match/
│   │   │   │   ├── othello/
│   │   │   │   ├── shiritori/
│   │   │   │   └── ...
│   │   │   ├── kids-mode/
│   │   │   ├── menu/
│   │   │   └── index.html
│   │   ├── firebase.json
│   │   └── .firebaserc
│   ├── nihon_quest_mobile/ (Flutter app)
│   └── nihon-quest-fullstack/ (React app)
│
└── feature/* (active development branches)
```

---

## 🔗 Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)

---

## 🎯 Current Active Branch

**Branch:** `feature/japanese-learning-games-enhancement`  
**Created:** 2026-07-01  
**Status:** Pushed to remote  
**PR Link:** https://github.com/JorelFuji/Nihonpractice/pull/new/feature/japanese-learning-games-enhancement

**Changes:**
- ✅ Enhanced Memory Match game with 70+ Japanese vocabulary
- ✅ Added Japanese Learning Rules page
- ✅ Enhanced Kids Mode with authentic content
- ✅ Deployed to Firebase Hosting

---

## 📞 Questions or Updates?

If you have questions about this branching strategy or need to update it, please:
1. Open an issue in the repository
2. Create a discussion
3. Update this document via PR

**Last Updated:** 2026-07-01  
**Maintained By:** Development Team
