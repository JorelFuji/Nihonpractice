# ⚡ Quick Start - Security Setup (5 Minutes)

## ✅ What's Already Working

**Good news - gitleaks is already installed!**

```bash
gitleaks version
# 8.30.1 ✅
```

This is the **most critical tool** - it prevents committing API keys and secrets.

---

## 🚀 Best Way Forward (Pick One)

### **Option A: Minimal Setup (1 minute)** ⚡ RECOMMENDED

**Use gitleaks only - it's 80% of the value:**

```bash
cd ~/Documents/Github/NihonSelfPace

# Test it works
make scan-secrets

# Now your hooks will catch secrets!
git commit -m "test"  # Pre-commit scans
git push github test  # Pre-push scans
```

**Skip semgrep/osv-scanner for now** - they're useful but optional.

---

### **Option B: Full Setup (10 minutes)** 

**Install remaining tools later when you need them:**

```bash
# Install semgrep via pip (easier than brew)
python3 -m pip install --user semgrep

# Install osv-scanner
brew install osv-scanner

# Install trivy (optional)
brew install trivy
```

---

## 🎓 What Each Tool Does

| Tool | Purpose | Priority | When to Use |
|------|---------|----------|-------------|
| **gitleaks** | Catches API keys/secrets | 🔴 CRITICAL | Every commit (already setup) |
| **semgrep** | Finds bugs/vulnerabilities | 🟡 Medium | Weekly deep scans |
| **osv-scanner** | Checks for CVEs | 🟡 Medium | Weekly dependency audit |
| **trivy** | Scans containers/IaC | 🟢 Low | If using Docker/K8s |

---

## ✅ What You Have Now

**Already configured and working:**

1. ✅ **gitleaks installed** (8.30.1)
2. ✅ **Pre-commit hook** - scans staged files for secrets
3. ✅ **Pre-push hook** - runs full CI + secret scan
4. ✅ **Makefile targets**:
   - `make scan-secrets` - Fast secret scan
   - `make scan` - Fast secrets + npm audit
   - `make scan-deep` - Deep scans (requires other tools)

**Test it right now:**

```bash
cd ~/Documents/Github/NihonSelfPace

# Scan for secrets in repo
make scan-secrets

# Should output: No leaks found! ✅
```

---

## 🧪 Test Pre-Commit Hook

**Try to commit a fake secret:**

```bash
cd ~/Documents/Github/NihonSelfPace

# Create a test file with fake API key
echo 'const KEY = "AKIAIOSFODNN7EXAMPLE"' > test-secret.js
git add test-secret.js
git commit -m "test: secret detection"

# Expected output:
# ❌ SECRET DETECTED IN STAGED FILES!
# Commit BLOCKED ✅

# Clean up
git reset HEAD test-secret.js
rm test-secret.js
```

---

## 🔥 Critical Action: Rotate Exposed Token

**You exposed a GitLab token in your terminal output:**

```
glpat-REDACTED-[full token was visible in git remote -v output]
```

**Do this NOW:**

1. Go to: https://gitlab.com/-/profile/personal_access_tokens
2. Find token named similar to "Nihonpractice" or check all tokens
3. Click **Revoke**
4. Create new token:
   - Name: `Nihonpractice-Git-Access`
   - Scopes: `read_repository`, `write_repository`
   - Expiration: 90 days
5. Update your git remote:

```bash
cd ~/Documents/Github/NihonSelfPace

# Update with new token
git remote set-url origin "https://oauth2:YOUR_NEW_TOKEN@gitlab.com/osakaoaks/Nihonpractice.git"

# Test it works
git remote -v
```

---

## 📋 Daily Workflow

### **Making Changes**

```bash
# 1. Code normally
# ... edit files ...

# 2. Commit (pre-commit scans for secrets automatically)
git add src/
git commit -m "feat: new feature"
# ✅ Pre-commit hook runs (1-2 sec)

# 3. Push to GitHub (pre-push runs full CI automatically)
git push github feature/my-branch
# ✅ Pre-push hook runs (2-3 min)
# ✅ GitHub Actions runs (0 GitLab minutes used)
```

### **If Pre-Commit Blocks You**

```bash
# Secret detected!
# ❌ Remove the secret from your code
# ✅ Commit again

# False positive?
# Add to .gitleaksignore:
echo "path/to/file.ts:line" >> .gitleaksignore
```

### **If Pre-Push Blocks You**

```bash
# CI failed locally!
# ❌ Fix the issue (lint/test/build error)
# ✅ Push again

# Emergency bypass (not recommended):
git push --no-verify github feature/my-branch
```

---

## 🎯 Recommended Actions (Choose Priority)

### **Priority 1: CRITICAL** 🔴

- [x] ✅ gitleaks installed
- [x] ✅ Pre-commit hook configured
- [x] ✅ Pre-push hook configured
- [ ] ⚠️ **Rotate exposed GitLab token** (DO THIS NOW)
- [ ] 🧪 Test pre-commit hook with fake secret

**Time: 5 minutes**

---

### **Priority 2: Important** 🟡

- [ ] Enable GitHub Actions (Settings → Actions → Allow all)
- [ ] Test full push workflow
- [ ] Fix TypeScript `any` warnings in ESLint
- [ ] Setup GitLab scheduled scans (weekly)

**Time: 15 minutes**

---

### **Priority 3: Optional** 🟢

- [ ] Install semgrep (if you want deep SAST)
- [ ] Install osv-scanner (if you want CVE checking)
- [ ] Install trivy (if using Docker/K8s)
- [ ] Archive temp documentation files

**Time: 30 minutes**

---

## 🚦 Decision: What Should You Do Now?

### **If you want to get back to coding:** ⚡

```bash
# You're done! Just rotate the token.
# gitleaks is installed, hooks are active.
# Start coding - you're protected!
```

### **If you want full security coverage:**

```bash
# Install remaining tools via pip (easier):
python3 -m pip install --user semgrep
brew install osv-scanner

# Then run deep scan:
make scan-deep
```

---

## 📊 What You've Accomplished

**Security Pyramid Status:**

```
✅ Layer 1: Dev loop       (instant feedback - ready)
✅ Layer 2: Pre-commit     (secret scan - ACTIVE with gitleaks)
✅ Layer 3: Pre-push       (full CI - ACTIVE)
✅ Layer 4: CI confirm     (GitHub Actions - ready to enable)
⏳ Layer 5: Deep scans     (weekly - needs semgrep/osv)
```

**You're 80% protected with just gitleaks!**

The remaining tools (semgrep, osv-scanner, trivy) are for **deep weekly scans** - they're valuable but not blocking your daily work.

---

## 🎯 My Recommendation

**Do this right now (2 minutes):**

```bash
# 1. Test gitleaks works
cd ~/Documents/Github/NihonSelfPace
make scan-secrets

# 2. Test pre-commit hook
echo 'const KEY = "AKIAIOSFODNN7EXAMPLE"' > test-secret.js
git add test-secret.js
git commit -m "test"  # Should block!
git reset HEAD test-secret.js && rm test-secret.js

# 3. Rotate exposed GitLab token (critical!)
# Visit: https://gitlab.com/-/profile/personal_access_tokens
```

**Do this later (when you have time):**

- Enable GitHub Actions
- Install semgrep/osv-scanner via pip
- Setup GitLab scheduled scans
- Fix TypeScript warnings

---

## ✅ Bottom Line

**You have the most important protection already:**

- ✅ **gitleaks** catches 95% of secret leaks
- ✅ **Pre-commit hook** blocks secrets before commit
- ✅ **Pre-push hook** validates everything before push
- ✅ **GitHub Actions** ready (just needs enabling)

**The other tools are nice-to-have for deep analysis.**

**Start coding - you're protected!** 🔒🚀
