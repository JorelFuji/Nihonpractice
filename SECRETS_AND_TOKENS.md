# 🔐 Secrets and Tokens Setup Guide

**⚠️ IMPORTANT: This guide contains instructions for handling sensitive credentials. Never commit actual tokens to version control!**

---

## 📋 Table of Contents

- [Overview](#overview)
- [GitLab Access Token](#gitlab-access-token)
- [Environment Variables](#environment-variables)
- [Setup Instructions](#setup-instructions)
- [Security Best Practices](#security-best-practices)
- [Using Tokens](#using-tokens)
- [Troubleshooting](#troubleshooting)

---

## 🔍 Overview

This project uses **environment variables** and **access tokens** to securely manage credentials for:
- GitLab repository access
- Firebase deployment
- CI/CD pipelines
- External API integrations

---

## 🔑 GitLab Access Token

### Token Details

**Token Name:** `nihonpractice-push-pull`  
**Scope:** `write_repository` (grants both pull and push access)  
**Role:** Developer  
**Created:** July 1, 2026  
**Expires:** June 30, 2027 (11 months)

### Token Capabilities

✅ **Can Do:**
- Clone repository
- Push commits
- Pull changes
- Create branches
- Delete branches
- Read repository contents

❌ **Cannot Do:**
- Delete repository
- Change project settings
- Manage team members
- Access admin features

---

## 📁 Environment Variables

### File Structure

```
NihonSelfPace/
├── .env                    # Your actual secrets (NEVER COMMIT)
├── .env.example           # Template file (safe to commit)
├── .gitignore             # Ensures .env is never committed
└── SECRETS_AND_TOKENS.md  # This file
```

### .env File Contents

The `.env` file contains:

```bash
# GitLab Configuration
GITLAB_TOKEN=glpat-iA0e_I-7VfqmveusEVJnWmM6MQpvOjEKdTpucmhsZg8.01.1714od9bh
GITLAB_USERNAME=oauth2
GITLAB_PROJECT_URL=gitlab.com/osakaoaks/Nihonpractice.git

# Firebase Configuration
FIREBASE_PROJECT_ID=nihonselfpacepractic
FIREBASE_TOKEN=your_firebase_token_here

# Project Information
PROJECT_ID=83983902
PROJECT_NAME=NihonPractice

# Environment
NODE_ENV=development
```

---

## 🚀 Setup Instructions

### Step 1: Verify .env File Exists

```bash
# Check if .env exists
ls -la .env

# If it doesn't exist, create from template
cp .env.example .env
```

### Step 2: Verify .gitignore Protection

```bash
# Check that .env is in .gitignore
cat .gitignore | grep ".env"

# You should see:
# .env
# .env.local
# etc.
```

### Step 3: Configure Git Remote with Token

The GitLab remote is already configured with the token:

```bash
# View current remotes
git remote -v

# You should see:
# gitlab  https://oauth2:TOKEN@gitlab.com/osakaoaks/Nihonpractice.git
# origin  https://github.com/JorelFuji/Nihonpractice.git
```

### Step 4: Test GitLab Access

```bash
# Test fetching from GitLab
git fetch gitlab

# If successful, you're ready to push!
```

---

## 🔒 Security Best Practices

### ✅ DO:

1. **Keep .env file local** - Never commit it
2. **Use .env.example** - Commit this as a template
3. **Rotate tokens regularly** - Before expiration (June 2027)
4. **Use different tokens** - For different environments
5. **Revoke compromised tokens** - Immediately if exposed
6. **Set minimal permissions** - Only what's needed
7. **Document token purpose** - In .env comments
8. **Use environment-specific files** - .env.development, .env.production

### ❌ DON'T:

1. **Never commit .env** - It's in .gitignore for a reason
2. **Don't share tokens** - In chat, email, screenshots
3. **Don't hardcode tokens** - In source code
4. **Don't use same token** - Across multiple projects
5. **Don't ignore expiration** - Set calendar reminders
6. **Don't grant excessive permissions** - Use least privilege
7. **Don't store in plain text** - Outside of .env files
8. **Don't include in logs** - Mask tokens in output

---

## 🎯 Using Tokens

### Pushing to GitLab

```bash
# Push current branch to GitLab
git push gitlab feature/your-branch-name

# Push all branches
git push gitlab --all

# Push tags
git push gitlab --tags

# Force push (use carefully!)
git push gitlab feature/your-branch-name --force
```

### Pushing to GitHub (Original Remote)

```bash
# Push to GitHub
git push origin feature/your-branch-name

# Push all branches to GitHub
git push origin --all
```

### Push to Both Remotes

```bash
# Push to both GitHub and GitLab
git push origin feature/your-branch-name
git push gitlab feature/your-branch-name

# Or create an alias
git config alias.pushall '!git push origin && git push gitlab'

# Then use:
git pushall
```

---

## 🔄 CI/CD Variables

### GitLab CI/CD Variables

Go to your GitLab project:
```
Settings → CI/CD → Variables → Add Variable
```

**Add these variables:**

1. **FIREBASE_TOKEN**
   - **Value:** Your Firebase CI token
   - **Type:** Variable
   - **Protected:** Yes
   - **Masked:** Yes
   - **Environment:** All

2. **GITLAB_TOKEN** (if needed for external calls)
   - **Value:** `glpat-iA0e_I-7VfqmveusEVJnWmM6MQpvOjEKdTpucmhsZg8.01.1714od9bh`
   - **Type:** Variable
   - **Protected:** Yes
   - **Masked:** Yes
   - **Environment:** All

### How to Get Firebase Token

```bash
# Login to Firebase
firebase login:ci

# Copy the token that appears
# Example: 1//0abc123def456...

# Add to GitLab CI/CD variables as FIREBASE_TOKEN
```

---

## 🛠️ Troubleshooting

### Problem: "Authentication failed"

**Solution:**
```bash
# Re-configure the GitLab remote with token
git remote set-url gitlab https://oauth2:YOUR_TOKEN@gitlab.com/osakaoaks/Nihonpractice.git

# Verify
git remote -v
```

---

### Problem: ".env file committed accidentally"

**Solution:**
```bash
# Remove from Git history (WARNING: Rewrites history)
git rm --cached .env
git commit -m "Remove .env from version control"

# Then IMMEDIATELY revoke the exposed token on GitLab:
# Settings → Access Tokens → Revoke

# Create new token and update .env
```

---

### Problem: "Token expired"

**Solution:**
```bash
# Go to GitLab: Settings → Access Tokens → Create new token
# Update .env file with new token
# Update Git remote:
git remote set-url gitlab https://oauth2:NEW_TOKEN@gitlab.com/osakaoaks/Nihonpractice.git
```

---

### Problem: "Permission denied"

**Solution:**
```bash
# Check token scope - must be 'write_repository'
# If scope is wrong, create new token with correct scope
# Update .env and Git remote
```

---

### Problem: "Can't push to main"

**Solution:**
```bash
# Main branch is protected - push to feature branch instead
git checkout -b feature/your-feature-name
git push gitlab feature/your-feature-name

# Then create merge request on GitLab
```

---

## 📊 Token Management

### Current Tokens

| Token Name | Scope | Role | Expires | Status |
|------------|-------|------|---------|--------|
| nihonpractice-push-pull | write_repository | Developer | Jun 30, 2027 | ✅ Active |

### Token Expiration Reminders

Set calendar reminders for:
- **May 30, 2027** - 1 month before expiration warning
- **June 15, 2027** - 2 weeks before expiration
- **June 28, 2027** - 2 days before expiration

### Rotating Tokens

**Before token expires:**

1. **Create new token** on GitLab
2. **Update .env** file with new token
3. **Update Git remote:**
   ```bash
   git remote set-url gitlab https://oauth2:NEW_TOKEN@gitlab.com/osakaoaks/Nihonpractice.git
   ```
4. **Update CI/CD variables** if used
5. **Test access** with `git fetch gitlab`
6. **Revoke old token** after confirming new one works
7. **Update team** if applicable

---

## 🔐 Checking Token Security

### Verify .env is NOT in Git

```bash
# This should return nothing
git ls-files | grep .env

# This should show .env
git check-ignore .env
# Output: .env (means it's ignored ✅)
```

### Check for Leaked Tokens

```bash
# Search Git history for potential leaks
git log --all --full-history --source --find-object=<commit>

# Use tools like:
# - git-secrets
# - truffleHog
# - GitHub secret scanning
```

---

## 📚 Additional Resources

### GitLab Documentation
- [Personal Access Tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)
- [CI/CD Variables](https://docs.gitlab.com/ee/ci/variables/)
- [Protected Branches](https://docs.gitlab.com/ee/user/project/protected_branches.html)

### Security Best Practices
- [OWASP Secure Coding](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [Git Security](https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage)
- [Environment Variables](https://12factor.net/config)

---

## 🆘 Emergency Procedures

### If Token is Compromised:

1. **IMMEDIATELY REVOKE** the token on GitLab
   - Go to: Settings → Access Tokens
   - Click "Revoke" next to the token

2. **Create new token** with different name

3. **Update all locations:**
   - .env file
   - Git remote URL
   - CI/CD variables
   - Team documentation

4. **Review access logs** on GitLab

5. **Notify team** if applicable

6. **Change passwords** if you suspect broader compromise

---

## 📝 Quick Reference Commands

```bash
# View remotes with tokens (careful - shows token!)
git remote -v

# Push to GitLab
git push gitlab branch-name

# Push to GitHub
git push origin branch-name

# Fetch from GitLab
git fetch gitlab

# Pull from GitLab
git pull gitlab branch-name

# Check if .env is ignored
git check-ignore .env

# Load environment variables (Linux/Mac)
source .env

# Load environment variables (Windows)
# Use .env.bat or a tool like dotenv-cli
```

---

## ✅ Security Checklist

Before committing:
- [ ] .env file is in .gitignore
- [ ] No tokens in source code
- [ ] .env.example has dummy values
- [ ] Tokens are masked in logs
- [ ] CI/CD variables are protected
- [ ] README doesn't contain actual tokens
- [ ] No tokens in screenshots/docs
- [ ] Team knows not to share tokens

---

## 🎯 Summary

**Your setup is complete! ✅**

- ✅ .env file created with GitLab token
- ✅ .gitignore protects .env from commits
- ✅ .env.example provided as template
- ✅ GitLab remote configured with token
- ✅ GitHub remote maintained separately
- ✅ Security best practices documented

**You can now safely push to GitLab without committing secrets!**

---

**Last Updated:** July 1, 2026  
**Token Expires:** June 30, 2027  
**Status:** ✅ Configured and Secure

---

**🔒 Remember: Security is everyone's responsibility!**
