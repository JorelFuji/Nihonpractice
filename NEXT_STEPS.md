# 🚀 Next Steps - CI Defense System

## ⚡ Quick Start (Do This Now - 2 minutes)

### **1. Enable This Repo** ✅

```bash
cd ~/Documents/Github/NihonSelfPace
./setup-ci-defense.sh
```

**What it does:**
- ✅ Installs pre-push hook
- ✅ Configures git to use `.githooks/`
- ✅ Updates `.gitignore`

---

### **2. Enable GitHub Actions** (1 minute)

**Go to:** https://github.com/JorelFuji/Nihonpractice/settings/actions

1. Click **Settings** → **Actions** → **General**
2. Under "Actions permissions":
   - Select: ✅ **Allow all actions and reusable workflows**
3. Click **Save**

**Push the workflow:**
```bash
git push github feature/japanese-learning-games-enhancement
```

**Verify it works:**
- Go to: https://github.com/JorelFuji/Nihonpractice/actions
- You should see the "CI" workflow running

---

### **3. Update GitLab Settings** (Optional - 30 seconds)

**Go to:** https://gitlab.com/osakaoaks/Nihonpractice/-/settings/ci_cd

1. Expand **General pipelines**
2. Under "Auto-cancel redundant pipelines":
   - Enable: ✅ **Auto-cancel redundant pipelines**
3. Click **Save changes**

*(Already configured in .gitlab-ci.yml, but this is a backup)*

---

## 🎯 Test It Works

### **Test 1: Pre-push Hook Blocks Bad Code**

```bash
# Create an intentional error
echo "bad syntax {{{" >> test-file.txt
git add test-file.txt
git commit -m "test: will hook block this?"

# Try to push
git push github feature/test

# ✅ Expected: Hook runs 'make ci', fails, blocks push
# Output: "❌ LOCAL CI FAILED - Push blocked"

# Clean up
git reset HEAD~1
rm test-file.txt
```

### **Test 2: GitHub Actions Runs**

```bash
# Push valid code
git commit --allow-empty -m "test: github actions"
git push github feature/japanese-learning-games-enhancement

# ✅ Check: https://github.com/JorelFuji/Nihonpractice/actions
# Expected: "CI" workflow runs and passes
```

### **Test 3: GitLab Skips Feature Branch**

```bash
# Feature branch should NOT trigger GitLab CI
git push origin feature/japanese-learning-games-enhancement

# ✅ Check: https://gitlab.com/osakaoaks/Nihonpractice/-/pipelines
# Expected: No new pipeline (feature branches skipped)
```

### **Test 4: Force GitLab with [ci]**

```bash
# Explicitly opt-in to GitLab CI
git commit --allow-empty -m "test: force gitlab [ci]"
git push origin feature/japanese-learning-games-enhancement

# ✅ Check: https://gitlab.com/osakaoaks/Nihonpractice/-/pipelines
# Expected: Pipeline runs (forced by [ci] marker)
```

---

## 📊 Your New Workflow

### **Daily Feature Development**

```bash
# 1. Create feature branch
git checkout -b feature/my-awesome-feature

# 2. Make changes
# ... code code code ...

# 3. Commit (pre-push hook auto-runs on push)
git add .
git commit -m "feat: add awesome feature"

# 4. Push to GitHub (uses GitHub Actions)
git push github feature/my-awesome-feature
#     ^^^^^^ Note: GitHub, not origin

# 5. Check GitHub Actions
# https://github.com/JorelFuji/Nihonpractice/actions

# 6. When ready to merge
git checkout main
git merge feature/my-awesome-feature

# 7. Deploy via GitLab
git push origin main
#     ^^^^^^ Now push to GitLab for deployment
```

### **Documentation Changes (Skip CI)**

```bash
git commit -m "docs: update README [skip ci]"
git push origin main
# ✅ Neither GitHub nor GitLab runs (0 minutes)
```

### **Bypass Hook (Emergency Only)**

```bash
git push --no-verify github feature/urgent-fix
# ⚠️ Skips pre-push hook - use sparingly!
```

---

## 🔄 Apply to All Your Repos

### **Option A: Bulk Install**

```bash
cd ~/Documents/Github
./setup-all-repos.sh
```

**What it does:**
- Scans all repos in `~/Documents/Github`
- Installs pre-push hook in repos with CI config
- Skips repos without Makefile/package.json
- Shows summary of installed/skipped

### **Option B: Manual Per-Repo**

```bash
cd ~/Documents/Github/SomeOtherRepo

# Copy hook from NihonSelfPace
cp ~/Documents/Github/NihonSelfPace/.githooks/pre-push .githooks/
chmod +x .githooks/pre-push

# Configure git
git config core.hooksPath .githooks

# Add to .gitignore
echo ".history/" >> .gitignore
```

---

## 📈 Monitor Your Savings

### **GitLab Minutes**

**Before:** 368 / 400 used (92% - only 32 min left)  
**After setup:** Check at: https://gitlab.com/groups/osakaoaks/-/usage_quotas

**Expected after 1 week:**
- Feature pushes: 0 GitLab minutes (all on GitHub)
- Main deployments: ~20 minutes
- **Total: ~20 / 400 (95% remaining)** 🎉

### **GitHub Actions**

**Check at:** https://github.com/settings/billing

**Expected:**
- Feature CI: ~100 minutes used
- **Total: 100 / 2,000 (95% remaining)** 🎉

---

## 🆘 Troubleshooting

### **Hook doesn't run**

```bash
# Verify hook is executable
ls -la .githooks/pre-push
# Should show: -rwxr-xr-x

# Verify git config
git config core.hooksPath
# Should output: .githooks

# Reinstall if needed
./setup-ci-defense.sh
```

### **GitHub Actions not showing**

1. Check: https://github.com/JorelFuji/Nihonpractice/settings/actions
2. Ensure "Allow all actions" is enabled
3. Verify `.github/workflows/ci.yml` exists:
   ```bash
   ls -la .github/workflows/ci.yml
   ```
4. Push to trigger:
   ```bash
   git push github feature/test
   ```

### **GitLab still running on features**

Check workflow rules:
```bash
cat .gitlab-ci.yml | grep -A 30 "^workflow:"
```

Should have:
```yaml
- if: $CI_COMMIT_BRANCH =~ /^feature\//
  when: never
```

If not, pull latest changes:
```bash
git pull origin feature/japanese-learning-games-enhancement
```

---

## 🎓 Advanced: Self-Hosted Runner

**Only do this if you want unlimited GitLab minutes on your machine.**

### **Install Runner**

```bash
# Install
brew install gitlab-runner

# Get registration token from:
# https://gitlab.com/osakaoaks/Nihonpractice/-/settings/ci_cd

# Register
gitlab-runner register \
  --url "https://gitlab.com/" \
  --registration-token "YOUR_TOKEN" \
  --executor "docker" \
  --docker-image "node:18-alpine" \
  --description "macbook-runner" \
  --tag-list "local"

# Start
brew services start gitlab-runner
```

### **Use in Pipeline**

Update jobs to use your runner:

```yaml
test:lint:
  tags:
    - local  # Runs on your machine
  script:
    - make ci
```

**Result:** Jobs tagged `local` run on your machine, use 0 GitLab minutes.

---

## 📚 Full Documentation

- **Setup Guide:** `CI_DEFENSE_SYSTEM.md`
- **Makefile CI:** `MAKEFILE_CI_GUIDE.md`
- **Local CI:** `LOCAL_CI_GUIDE.md`
- **Build Optimization:** `BUILD_TIME_OPTIMIZATION.md`

---

## ✅ Checklist

**Setup (Do Now):**
- [ ] Run `./setup-ci-defense.sh`
- [ ] Enable GitHub Actions
- [ ] Push to GitHub to test
- [ ] Verify GitLab skips features

**Daily Use:**
- [ ] Push features to `github`
- [ ] Push main to `origin` (GitLab)
- [ ] Use `[skip ci]` for docs
- [ ] Trust the pre-push hook

**Monitor:**
- [ ] Check GitLab minutes weekly
- [ ] Check GitHub Actions monthly
- [ ] Verify hook is blocking failures

---

## 🎯 Success Metrics

**After 1 week, you should see:**

| Metric | Before | Target | Status |
|--------|--------|--------|--------|
| GitLab minutes used | 368/400 | <100/400 | 🎯 |
| Pipeline failure rate | 30% | <5% | 🎯 |
| Failed pushes blocked | 0 | 15+ | 🎯 |
| Feature branch minutes | High | 0 | 🎯 |

---

## 🚀 Ready?

**Run this now:**

```bash
cd ~/Documents/Github/NihonSelfPace
./setup-ci-defense.sh
```

**Then push to GitHub:**

```bash
git push github feature/japanese-learning-games-enhancement
```

**Check it works:**
- GitHub Actions: https://github.com/JorelFuji/Nihonpractice/actions
- GitLab Pipelines: https://gitlab.com/osakaoaks/Nihonpractice/-/pipelines

---

**Your CI minutes will never run out again! 🎉**
