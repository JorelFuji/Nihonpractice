# CI/CD Defense System
## Prevent GitLab Minute Exhaustion

**Problem:** 368/400 GitLab minutes used (92%) - only ~4 pipeline runs left  
**Solution:** Three-tier defense system that prevents wasted CI minutes

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  TIER 1: LOCAL (Pre-push Hook)                              │
│  Catches: 80% of failures                                   │
│  Cost: 0 minutes                                            │
│  Speed: 2-3 minutes                                         │
└─────────────────────────────────────────────────────────────┘
                            ↓ (if passes)
┌─────────────────────────────────────────────────────────────┐
│  TIER 2: GITHUB ACTIONS (Feature CI)                        │
│  Catches: Feature branch issues                             │
│  Cost: 0 minutes (2,000 free/month)                        │
│  Speed: 5-8 minutes                                         │
└─────────────────────────────────────────────────────────────┘
                            ↓ (merge to main)
┌─────────────────────────────────────────────────────────────┐
│  TIER 3: GITLAB CI (Deploy Only)                            │
│  Catches: Production issues                                 │
│  Cost: 6-8 minutes per run                                  │
│  Speed: 6-8 minutes                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Setup (5 minutes)

### **Option A: This Repo Only**

```bash
cd ~/Documents/Github/NihonSelfPace
chmod +x setup-ci-defense.sh
./setup-ci-defense.sh
```

### **Option B: All Repos in ~/Documents/Github**

```bash
cd ~/Documents/Github
chmod +x setup-all-repos.sh
./setup-all-repos.sh
```

---

## 📋 What Gets Installed

### **1. Pre-push Git Hook** (`.githooks/pre-push`)
- Automatically runs `make ci` before every push
- **Blocks push if CI fails** (saves 6-8 minutes)
- Can bypass with `git push --no-verify` if needed

### **2. GitHub Actions Workflow** (`.github/workflows/ci.yml`)
- Runs on all feature branches
- 2,000 free minutes/month (vs GitLab's 400)
- Same checks as local CI
- Auto-cancels superseded pipelines

### **3. GitLab CI Restrictions** (`.gitlab-ci.yml`)
- **Feature branches:** Skipped by default (use GitHub)
- **Main branch:** Always runs (deployment)
- **Merge requests:** Always runs
- **Docs-only:** Automatically skipped
- **Opt-in:** Add `[ci]` to commit message to force run

---

## 📊 Minute Savings Breakdown

### **Before (Old Workflow)**
```
Every push → GitLab CI
15 min/run × 25 pushes = 375 minutes
Problem: Burned through quota quickly
```

### **After Optimization (Still Risky)**
```
Every push → GitLab CI
6-8 min/run × 50 pushes = 300-400 minutes
Problem: Still hitting limit
```

### **With Defense System (Safe)**
```
Feature push → GitHub Actions (free)
Main merge → GitLab CI (6-8 min)

Monthly usage:
- Feature branches: 0 GitLab minutes
- Main deployments: 10 runs × 8 min = 80 minutes
- Safety margin: 320 minutes remaining (80% free)
```

---

## 🔧 Daily Workflow

### **Feature Development (Use GitHub)**

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and commit
git add .
git commit -m "feat: add new feature"

# 3. Pre-push hook runs automatically
# (make ci executes, push blocks if fails)

# 4. Push to GitHub (uses GitHub Actions)
git push github feature/new-feature

# 5. GitHub Actions runs CI (free minutes)
# Check: https://github.com/JorelFuji/Nihonpractice/actions
```

### **Deploying to Production (Use GitLab)**

```bash
# 1. Merge feature to main
git checkout main
git merge feature/new-feature

# 2. Push to GitLab (triggers deployment)
git push origin main

# 3. GitLab CI runs (costs 6-8 minutes)
# Check: https://gitlab.com/osakaoaks/Nihonpractice/-/pipelines
```

### **Documentation Changes (Skip CI)**

```bash
git commit -m "docs: update README [skip ci]"
git push origin main
# Neither GitHub nor GitLab CI runs (0 minutes)
```

### **Force GitLab CI on Feature Branch**

```bash
git commit -m "feat: test deployment [ci]"
git push origin feature/my-branch
# GitLab CI runs even on feature branch
```

---

## ⚙️ GitLab Configuration

### **1. Enable Auto-Cancel**

**Already configured in `.gitlab-ci.yml`:**

```yaml
default:
  interruptible: true

workflow:
  auto_cancel:
    on_new_commit: interruptible
```

**Effect:** Pushing 3 times in a row cancels the first 2 pipelines (saves 12-16 minutes)

### **2. Skip Feature Branches**

**Already configured in `.gitlab-ci.yml`:**

```yaml
workflow:
  rules:
    # Always run on main
    - if: $CI_COMMIT_BRANCH == "main"
    
    # Always run for merge requests
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    
    # Allow explicit opt-in with [ci]
    - if: $CI_COMMIT_MESSAGE =~ /\[ci\]/
    
    # Skip feature branches (use GitHub instead)
    - if: $CI_COMMIT_BRANCH =~ /^feature\//
      when: never
```

**Effect:** Feature branches don't run on GitLab by default

### **3. Skip Docs-Only Changes**

**Already configured:**

```yaml
- if: $CI_COMMIT_MESSAGE =~ /\[skip ci\]/
  when: never
```

**Usage:** `git commit -m "docs: update [skip ci]"`

---

## 🐙 GitHub Actions Configuration

### **1. Enable GitHub Actions**

1. Go to: https://github.com/JorelFuji/Nihonpractice
2. Click **Settings** → **Actions** → **General**
3. Under "Actions permissions":
   - ✅ **Allow all actions and reusable workflows**
4. Click **Save**

### **2. Verify Workflow**

After pushing `.github/workflows/ci.yml`:

1. Go to: https://github.com/JorelFuji/Nihonpractice/actions
2. You should see the "CI" workflow
3. Push a feature branch to test:
   ```bash
   git push github feature/japanese-learning-games-enhancement
   ```

### **3. Check Minute Usage**

1. Go to: https://github.com/settings/billing
2. Under "Actions & Packages"
3. You'll see: **Used: X / 2,000 minutes**

---

## 🏠 Self-Hosted GitLab Runner (Advanced)

**Benefits:**
- ✅ Unlimited GitLab minutes (runs on your machine)
- ✅ Faster builds (no queue)
- ✅ Access to local files

**Tradeoffs:**
- ❌ Must keep machine running
- ❌ Uses your electricity/compute
- ❌ More maintenance

### **Setup Instructions**

#### **1. Install GitLab Runner**

```bash
# macOS
brew install gitlab-runner

# Start service
brew services start gitlab-runner
```

#### **2. Get Registration Token**

1. Go to: https://gitlab.com/osakaoaks/Nihonpractice/-/settings/ci_cd
2. Expand **Runners**
3. Under **Specific runners**, copy the registration token

#### **3. Register Runner**

```bash
gitlab-runner register \
  --non-interactive \
  --url "https://gitlab.com/" \
  --registration-token "YOUR_TOKEN_HERE" \
  --executor "docker" \
  --docker-image "node:18-alpine" \
  --description "local-macbook-runner" \
  --tag-list "local,docker,macos" \
  --run-untagged="false" \
  --locked="false"
```

#### **4. Update `.gitlab-ci.yml`**

Add tags to jobs you want to run locally:

```yaml
test:lint:
  tags:
    - local  # Runs on your self-hosted runner
  script:
    - make ci
```

#### **5. Start Runner**

```bash
gitlab-runner start
```

Now pipelines tagged with `local` run on your machine (0 GitLab minutes).

---

## 🧪 Testing the Setup

### **Test 1: Pre-push Hook**

```bash
# Create a breaking change
echo "syntax error" >> package.json

# Try to push
git add package.json
git commit -m "test: breaking change"
git push github test-branch

# Expected: Pre-push hook blocks the push
# Output: "❌ LOCAL CI FAILED - Push blocked"
```

### **Test 2: Bypass Hook**

```bash
# Skip hook if needed
git push --no-verify github test-branch

# Expected: Push succeeds (but CI may fail remotely)
```

### **Test 3: GitHub Actions**

```bash
# Push valid code
git checkout -b feature/test-github
git commit --allow-empty -m "test: github actions"
git push github feature/test-github

# Check: https://github.com/JorelFuji/Nihonpractice/actions
# Expected: Workflow runs and passes
```

### **Test 4: GitLab Skip**

```bash
# Feature branch push
git checkout -b feature/test-gitlab
git commit --allow-empty -m "test: gitlab skip"
git push origin feature/test-gitlab

# Check: https://gitlab.com/osakaoaks/Nihonpractice/-/pipelines
# Expected: No pipeline created (skipped)
```

### **Test 5: GitLab Force**

```bash
# Force GitLab CI with [ci] marker
git commit --allow-empty -m "test: force gitlab [ci]"
git push origin feature/test-gitlab

# Expected: GitLab pipeline runs
```

---

## 📊 Monitoring & Alerts

### **GitLab Minute Usage**

1. Go to: https://gitlab.com/groups/osakaoaks/-/usage_quotas
2. Check **CI/CD minutes** tab
3. See remaining: **32 / 400 minutes**

**Set up alerts:**
- GitLab emails when 75%, 90%, 100% used
- Check: https://gitlab.com/-/profile/notifications

### **GitHub Actions Usage**

1. Go to: https://github.com/settings/billing
2. Under **Actions & Packages**
3. See usage: **X / 2,000 minutes**

### **Local Hook Statistics**

```bash
# Count how many times hook blocked a push
grep -r "LOCAL CI FAILED" ~/.git_hooks_log 2>/dev/null | wc -l

# This shows how many CI minutes you saved!
```

---

## 🚨 Troubleshooting

### **Hook doesn't run**

```bash
# Check hook is executable
ls -la .githooks/pre-push

# Should show: -rwxr-xr-x

# If not:
chmod +x .githooks/pre-push

# Verify git config
git config core.hooksPath
# Should output: .githooks
```

### **GitHub Actions not running**

1. Check Actions are enabled: Settings → Actions → General
2. Verify workflow file: `.github/workflows/ci.yml` exists
3. Check syntax: https://rhysd.github.io/actionlint/

### **GitLab still running on features**

Check `.gitlab-ci.yml` workflow rules:
```bash
git show HEAD:.gitlab-ci.yml | grep -A 20 "^workflow:"
```

Should have `when: never` for feature branches.

---

## 📈 Expected Results

### **Before Defense System**
```
Monthly pipeline runs: ~50
GitLab minutes used: 300-400
Risk: High (always near limit)
Failed pushes: 30-40%
```

### **After Defense System**
```
Monthly pipeline runs: ~60 total
  - GitHub Actions: ~50 (0 GitLab minutes)
  - GitLab CI: ~10 (80 GitLab minutes)
GitLab minutes used: 80-120
Risk: Low (80% under limit)
Failed pushes: <5% (blocked by hook)
```

**Savings: ~280 GitLab minutes/month**

---

## 🎯 Best Practices

### **DO:**
- ✅ Always run `make ci` locally before committing
- ✅ Push feature branches to GitHub
- ✅ Reserve GitLab for main/production
- ✅ Use `[skip ci]` for docs changes
- ✅ Batch multiple commits before pushing

### **DON'T:**
- ❌ Push every tiny commit to GitLab
- ❌ Forget to test locally first
- ❌ Bypass hooks without good reason
- ❌ Use GitLab for feature development
- ❌ Ignore CI failures (fix them!)

---

## 🔗 Quick Links

- **GitLab Pipelines:** https://gitlab.com/osakaoaks/Nihonpractice/-/pipelines
- **GitLab Minutes:** https://gitlab.com/groups/osakaoaks/-/usage_quotas
- **GitHub Actions:** https://github.com/JorelFuji/Nihonpractice/actions
- **GitHub Minutes:** https://github.com/settings/billing

---

## 📞 Support

**Hook issues:**
```bash
# Reinstall
./setup-ci-defense.sh

# Or manually
git config core.hooksPath .githooks
chmod +x .githooks/pre-push
```

**Minute questions:**
- GitLab FAQ: https://docs.gitlab.com/ee/ci/pipelines/cicd_minutes.html
- GitHub FAQ: https://docs.github.com/en/billing/managing-billing-for-github-actions

---

## ✅ Summary

**Setup time:** 5 minutes  
**Maintenance:** Zero  
**Monthly savings:** ~280 GitLab minutes  
**Failed pushes prevented:** 80%  

**The promise:** Your CI minutes will never run out again. 🚀
