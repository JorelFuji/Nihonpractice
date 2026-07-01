# 🔍 Version & Artifact Management Guide

Complete guide for checking versions, artifacts, and releases in GitHub/GitLab.

---

## 📋 **Table of Contents**

1. [GitHub - Current Repository](#github---current-repository)
2. [GitLab Setup](#gitlab-setup)
3. [Version Management](#version-management)
4. [Artifact Management](#artifact-management)
5. [Container Registry](#container-registry)

---

## 🐙 **GitHub - Current Repository**

### **Your Repository**
- **URL:** https://github.com/JorelFuji/Nihonpractice
- **Branch:** scrolling-improvements-and-games

### **1. Check Current Version**

```bash
# From your project directory
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice

# Check package.json version
cat nihon-quest-fullstack/frontend/package.json | grep version

# Check git tags
git tag -l

# Check latest commit
git log -1

# Check all branches
git branch -a
```

### **2. View Releases on GitHub**

```bash
# Open releases page
open https://github.com/JorelFuji/Nihonpractice/releases

# Or use GitHub CLI
gh release list

# View specific release
gh release view v1.0.0
```

### **3. Check GitHub Actions Artifacts**

```bash
# Open Actions page
open https://github.com/JorelFuji/Nihonpractice/actions

# List workflow runs
gh run list

# View specific run
gh run view <run-id>

# Download artifacts
gh run download <run-id>
```

### **4. View Container Images (GitHub Container Registry)**

```bash
# Open packages page
open https://github.com/JorelFuji?tab=packages

# Or view for specific repo
open https://github.com/JorelFuji/Nihonpractice/pkgs/container/nihonpractice

# Pull image
docker pull ghcr.io/jorelfuji/nihonpractice:latest

# List local images
docker images | grep nihonpractice
```

### **5. Check Deployment History**

```bash
# Firebase hosting history
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack/frontend
firebase hosting:channel:list

# View deployment details
open https://console.firebase.google.com/project/nihonselfpacepractic/hosting
```

---

## 🦊 **GitLab Setup**

### **Option 1: Mirror to GitLab**

```bash
# Add GitLab as remote
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice
git remote add gitlab https://gitlab.com/yourusername/nihonpractice.git

# Push to GitLab
git push gitlab scrolling-improvements-and-games

# Push all branches
git push gitlab --all

# Push tags
git push gitlab --tags

# View remotes
git remote -v
```

### **Option 2: Create New GitLab Project**

1. **Go to GitLab:**
   ```bash
   open https://gitlab.com/projects/new
   ```

2. **Create project:**
   - Project name: Nihonpractice
   - Visibility: Private/Public
   - Initialize with README: No

3. **Push existing repository:**
   ```bash
   cd /Users/jarrel/Documents/Github/boeung/Nihonpractice
   git remote add gitlab https://gitlab.com/yourusername/nihonpractice.git
   git push -u gitlab --all
   git push -u gitlab --tags
   ```

### **GitLab CI/CD Configuration**

Create `.gitlab-ci.yml`:

```yaml
image: node:18

stages:
  - build
  - test
  - deploy

variables:
  NODE_ENV: production

cache:
  paths:
    - nihon-quest-fullstack/frontend/node_modules/

build:
  stage: build
  script:
    - cd nihon-quest-fullstack/frontend
    - npm ci
    - npm run build
  artifacts:
    paths:
      - nihon-quest-fullstack/frontend/dist/
    expire_in: 1 week

test:
  stage: test
  script:
    - cd nihon-quest-fullstack/frontend
    - npm ci
    - npm run lint
    - npm run type-check
    - npm test

deploy:
  stage: deploy
  script:
    - cd nihon-quest-fullstack/frontend
    - npm ci
    - npm run build
    - firebase deploy --only hosting --token $FIREBASE_TOKEN
  only:
    - main
  environment:
    name: production
    url: https://nihonselfpacepractic.web.app
```

### **Check GitLab Artifacts**

```bash
# Open GitLab pipelines
open https://gitlab.com/yourusername/nihonpractice/-/pipelines

# Open specific pipeline
open https://gitlab.com/yourusername/nihonpractice/-/pipelines/<pipeline-id>

# Download artifacts via CLI
curl --header "PRIVATE-TOKEN: <your_access_token>" \
  "https://gitlab.com/api/v4/projects/<project-id>/jobs/<job-id>/artifacts" \
  --output artifacts.zip
```

---

## 📦 **Version Management**

### **1. Check Current Version**

```bash
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice

# Check package.json
cat nihon-quest-fullstack/frontend/package.json | grep '"version"'

# Check VERSION_CONTROL.md
cat VERSION_CONTROL.md | grep "Current Version" -A 5

# Check CHANGELOG.md
cat CHANGELOG.md | head -20
```

### **2. View All Git Tags**

```bash
# List all tags
git tag -l

# List tags with messages
git tag -n

# Show specific tag
git show v1.0.0

# List tags sorted by version
git tag -l --sort=-v:refname
```

### **3. Check Version in Code**

```bash
# Frontend version
cat nihon-quest-fullstack/frontend/package.json | jq '.version'

# Functions version
cat nihon-quest-fullstack/functions/package.json | jq '.version'

# Helm chart version
cat helm/nihon-quest/Chart.yaml | grep version
```

### **4. Create New Version**

```bash
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack/frontend

# Bump patch version (1.0.0 -> 1.0.1)
npm version patch

# Bump minor version (1.0.0 -> 1.1.0)
npm version minor

# Bump major version (1.0.0 -> 2.0.0)
npm version major

# Custom version
npm version 1.2.3

# Push with tags
git push origin main --tags
```

---

## 📦 **Artifact Management**

### **1. GitHub Actions Artifacts**

#### **View Artifacts in GitHub UI**
```bash
# Open Actions page
open https://github.com/JorelFuji/Nihonpractice/actions

# Click on any workflow run
# Scroll down to "Artifacts" section
```

#### **Download Artifacts via CLI**
```bash
# List recent runs
gh run list --limit 5

# View specific run
gh run view <run-id>

# Download all artifacts from a run
gh run download <run-id>

# Download specific artifact
gh run download <run-id> -n dist
```

#### **Artifacts in Workflow**
Your `.github/workflows/cicd-full.yaml` already creates artifacts:

```yaml
- name: Upload build artifacts
  uses: actions/upload-artifact@v3
  with:
    name: dist
    path: nihon-quest-fullstack/frontend/dist
    retention-days: 1
```

### **2. Docker Images (Artifacts)**

#### **GitHub Container Registry**
```bash
# View packages
open https://github.com/JorelFuji?tab=packages

# Pull image
docker pull ghcr.io/jorelfuji/nihonpractice:latest

# List all tags
docker images ghcr.io/jorelfuji/nihonpractice

# Inspect image
docker inspect ghcr.io/jorelfuji/nihonpractice:latest
```

#### **Build and Tag Locally**
```bash
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack

# Build with version tag
docker build -t nihon-quest:1.0.0 -f Dockerfile .

# Tag for registry
docker tag nihon-quest:1.0.0 ghcr.io/jorelfuji/nihonpractice:1.0.0
docker tag nihon-quest:1.0.0 ghcr.io/jorelfuji/nihonpractice:latest

# Push to registry
docker push ghcr.io/jorelfuji/nihonpractice:1.0.0
docker push ghcr.io/jorelfuji/nihonpractice:latest
```

### **3. Firebase Artifacts**

#### **Hosting Versions**
```bash
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack/frontend

# List hosting versions
firebase hosting:channel:list

# View in console
open https://console.firebase.google.com/project/nihonselfpacepractic/hosting
```

#### **Build Artifacts**
```bash
# Build creates artifacts in dist/
npm run build

# View build artifacts
ls -lh dist/

# Check build size
du -sh dist/
```

### **4. Helm Charts (Artifacts)**

```bash
# Package Helm chart
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice
helm package helm/nihon-quest

# This creates: nihon-quest-1.0.0.tgz

# List packaged charts
ls -lh *.tgz

# Inspect chart
helm show chart nihon-quest-1.0.0.tgz
helm show values nihon-quest-1.0.0.tgz
```

---

## 🐳 **Container Registry**

### **GitHub Container Registry (GHCR)**

#### **Setup Authentication**
```bash
# Create personal access token
open https://github.com/settings/tokens

# Login to GHCR
echo $GITHUB_TOKEN | docker login ghcr.io -u jorelfuji --password-stdin

# Or use GitHub CLI
gh auth token | docker login ghcr.io -u jorelfuji --password-stdin
```

#### **Push Images**
```bash
# Build image
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice/nihon-quest-fullstack
docker build -t ghcr.io/jorelfuji/nihonpractice:latest .

# Push image
docker push ghcr.io/jorelfuji/nihonpractice:latest

# Push with version tag
docker tag ghcr.io/jorelfuji/nihonpractice:latest ghcr.io/jorelfuji/nihonpractice:1.0.0
docker push ghcr.io/jorelfuji/nihonpractice:1.0.0
```

#### **View Images**
```bash
# Open packages page
open https://github.com/JorelFuji?tab=packages

# List images locally
docker images | grep nihonpractice

# Pull specific version
docker pull ghcr.io/jorelfuji/nihonpractice:1.0.0
```

### **GitLab Container Registry**

#### **Setup**
```bash
# Login to GitLab registry
docker login registry.gitlab.com -u yourusername

# Build and tag
docker build -t registry.gitlab.com/yourusername/nihonpractice:latest .

# Push
docker push registry.gitlab.com/yourusername/nihonpractice:latest
```

#### **View in GitLab**
```bash
# Open container registry
open https://gitlab.com/yourusername/nihonpractice/container_registry
```

---

## 🔍 **Quick Check Commands**

### **Version Check**
```bash
# Current version
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice
cat nihon-quest-fullstack/frontend/package.json | jq '.version'

# Git tags
git tag -l

# Latest commit
git log -1 --oneline
```

### **Artifact Check**
```bash
# GitHub Actions artifacts
gh run list --limit 5

# Docker images
docker images | grep nihonpractice

# Firebase deployments
cd nihon-quest-fullstack/frontend
firebase hosting:channel:list

# Build artifacts
ls -lh nihon-quest-fullstack/frontend/dist/
```

### **Registry Check**
```bash
# GitHub packages
open https://github.com/JorelFuji?tab=packages

# Docker images
docker images ghcr.io/jorelfuji/nihonpractice
```

---

## 📊 **Version & Artifact Dashboard**

### **Create Quick Status Script**

Create `scripts/check-status.sh`:

```bash
#!/bin/bash

echo "🔍 Nihon Quest - Version & Artifact Status"
echo "=========================================="
echo ""

# Version
echo "📦 Current Version:"
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice
VERSION=$(cat nihon-quest-fullstack/frontend/package.json | jq -r '.version')
echo "  Version: $VERSION"
echo ""

# Git Info
echo "🌿 Git Status:"
BRANCH=$(git branch --show-current)
COMMIT=$(git log -1 --oneline)
echo "  Branch: $BRANCH"
echo "  Commit: $COMMIT"
echo ""

# Tags
echo "🏷️  Git Tags:"
git tag -l | tail -5
echo ""

# Docker Images
echo "🐳 Docker Images:"
docker images | grep nihonpractice | head -5
echo ""

# Firebase Deployment
echo "🔥 Firebase Deployment:"
cd nihon-quest-fullstack/frontend
firebase hosting:channel:list 2>/dev/null || echo "  Run 'firebase login' first"
echo ""

# Build Artifacts
echo "📦 Build Artifacts:"
if [ -d "dist" ]; then
  echo "  Size: $(du -sh dist | cut -f1)"
  echo "  Files: $(find dist -type f | wc -l)"
else
  echo "  No build artifacts (run 'npm run build')"
fi
echo ""

echo "✅ Status check complete!"
```

Make it executable and run:
```bash
chmod +x scripts/check-status.sh
./scripts/check-status.sh
```

---

## 🎯 **Quick Reference**

### **GitHub**
| Action | Command |
|--------|---------|
| View releases | `open https://github.com/JorelFuji/Nihonpractice/releases` |
| View actions | `open https://github.com/JorelFuji/Nihonpractice/actions` |
| View packages | `open https://github.com/JorelFuji?tab=packages` |
| List runs | `gh run list` |
| Download artifacts | `gh run download <run-id>` |

### **GitLab**
| Action | Command |
|--------|---------|
| View pipelines | `open https://gitlab.com/user/project/-/pipelines` |
| View registry | `open https://gitlab.com/user/project/container_registry` |
| View artifacts | `open https://gitlab.com/user/project/-/jobs` |

### **Version**
| Action | Command |
|--------|---------|
| Check version | `cat package.json \| jq '.version'` |
| List tags | `git tag -l` |
| Bump version | `npm version patch/minor/major` |
| Create tag | `git tag -a v1.0.0 -m "Release v1.0.0"` |

### **Artifacts**
| Action | Command |
|--------|---------|
| Build | `npm run build` |
| Check size | `du -sh dist/` |
| List images | `docker images` |
| Package Helm | `helm package helm/nihon-quest` |

---

## ✅ **Summary**

### **Your Current Setup**
- ✅ **Repository:** GitHub (https://github.com/JorelFuji/Nihonpractice)
- ✅ **Version:** 1.0.0 (in package.json)
- ✅ **Artifacts:** GitHub Actions, Firebase, Docker
- ✅ **Registry:** GitHub Container Registry (GHCR)

### **To Check Everything**
```bash
# Quick status
cd /Users/jarrel/Documents/Github/boeung/Nihonpractice
git status
git tag -l
cat nihon-quest-fullstack/frontend/package.json | jq '.version'
docker images | grep nihonpractice
gh run list --limit 5
```

### **To Add GitLab**
```bash
git remote add gitlab https://gitlab.com/yourusername/nihonpractice.git
git push gitlab --all
git push gitlab --tags
```

**Everything is tracked and versioned!** 🚀📦✨
