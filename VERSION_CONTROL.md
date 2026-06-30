# 📦 Version Control & Release Management

## 🏷️ **Semantic Versioning**

We follow [Semantic Versioning 2.0.0](https://semver.org/)

### **Version Format**
```
MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]

Example: v1.2.3-beta.1+20260630
```

### **Version Components**

- **MAJOR** - Breaking changes
- **MINOR** - New features (backward compatible)
- **PATCH** - Bug fixes (backward compatible)
- **PRERELEASE** - alpha, beta, rc (release candidate)
- **BUILD** - Build metadata (date, commit hash)

---

## 📊 **Current Version**

```json
{
  "version": "1.0.0",
  "codename": "Sakura",
  "releaseDate": "2026-06-30",
  "status": "development"
}
```

---

## 🔢 **Version History**

### **v1.0.0 - "Sakura" (In Development)**
**Release Date:** TBD

**Features:**
- ✅ Grammar Roadmap (N5-N1)
- ✅ Learning modules
- ✅ Hiragana/Katakana charts
- ✅ SOV practice
- ✅ Responsive design
- ✅ DevOps tooling
- 🚧 First game implementation
- 🚧 Mobile app

**Breaking Changes:**
- Initial release

---

## 📝 **CHANGELOG.md**

Maintain a changelog following [Keep a Changelog](https://keepachangelog.com/)

### **Format**
```markdown
# Changelog

## [Unreleased]

### Added
- New features

### Changed
- Changes to existing features

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security fixes

## [1.0.0] - 2026-06-30

### Added
- Initial release
```

---

## 🏷️ **Git Tags**

### **Creating Releases**

```bash
# 1. Update version in package.json
npm version major|minor|patch

# 2. Create annotated tag
git tag -a v1.0.0 -m "Release v1.0.0 - Sakura

Features:
- Grammar roadmap
- Learning modules
- DevOps tooling

Breaking changes:
- Initial release"

# 3. Push tag
git push origin v1.0.0

# 4. Create GitHub release
gh release create v1.0.0 \
  --title "v1.0.0 - Sakura" \
  --notes-file RELEASE_NOTES.md
```

### **Tag Naming Convention**

```
v1.0.0          # Production release
v1.0.0-beta.1   # Beta release
v1.0.0-rc.1     # Release candidate
v1.0.0-alpha.1  # Alpha release
```

---

## 📦 **Release Process**

### **1. Prepare Release**

```bash
# Create release branch
git checkout develop
git checkout -b release/v1.0.0

# Update version
npm version 1.0.0

# Update CHANGELOG.md
# Update version.json
# Update documentation
```

### **2. Test Release**

```bash
# Run all tests
make test

# Run linting
make lint

# Build
make build

# Deploy to staging
make deploy-staging
```

### **3. Create Release**

```bash
# Merge to main
git checkout main
git merge --no-ff release/v1.0.0

# Tag release
git tag -a v1.0.0 -m "Release v1.0.0"

# Push
git push origin main --tags

# Merge back to develop
git checkout develop
git merge --no-ff release/v1.0.0
git push origin develop

# Delete release branch
git branch -d release/v1.0.0
```

### **4. Deploy to Production**

```bash
# Automated via CI/CD on tag push
# Or manually:
make deploy-production
```

---

## 🔄 **Version Bump Strategy**

### **Patch Release (1.0.0 → 1.0.1)**
- Bug fixes only
- No new features
- Backward compatible

```bash
npm version patch
git push origin main --tags
```

### **Minor Release (1.0.0 → 1.1.0)**
- New features
- Backward compatible
- No breaking changes

```bash
npm version minor
git push origin main --tags
```

### **Major Release (1.0.0 → 2.0.0)**
- Breaking changes
- API changes
- Major refactoring

```bash
npm version major
git push origin main --tags
```

---

## 📋 **Release Checklist**

### **Pre-Release**
- [ ] All tests passing
- [ ] Code review completed
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped
- [ ] Release notes written
- [ ] Staging deployment tested

### **Release**
- [ ] Create release branch
- [ ] Merge to main
- [ ] Create git tag
- [ ] Push to repository
- [ ] Deploy to production
- [ ] Verify deployment
- [ ] Create GitHub release

### **Post-Release**
- [ ] Merge back to develop
- [ ] Announce release
- [ ] Monitor for issues
- [ ] Update project board
- [ ] Archive release branch

---

## 🎯 **Version Management Tools**

### **package.json**
```json
{
  "name": "nihon-quest",
  "version": "1.0.0",
  "scripts": {
    "version:major": "npm version major",
    "version:minor": "npm version minor",
    "version:patch": "npm version patch",
    "version:check": "echo $npm_package_version"
  }
}
```

### **version.json**
```json
{
  "version": "1.0.0",
  "codename": "Sakura",
  "releaseDate": "2026-06-30",
  "buildNumber": "1",
  "commitHash": "abc123",
  "branch": "main",
  "environment": "production"
}
```

---

## 🔍 **Version Display**

### **In Application**
```typescript
// src/version.ts
export const VERSION = {
  number: '1.0.0',
  codename: 'Sakura',
  releaseDate: '2026-06-30',
  buildDate: new Date().toISOString(),
}

// Display in footer
<footer>
  Version {VERSION.number} - {VERSION.codename}
</footer>
```

---

## 📊 **Release Metrics**

Track for each release:
- Release date
- Features added
- Bugs fixed
- Breaking changes
- Migration effort
- User feedback
- Performance impact
- Deployment time

---

## 🚀 **Automated Versioning**

### **GitHub Actions**
```yaml
name: Version Bump

on:
  push:
    branches:
      - main

jobs:
  version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Bump version
        run: |
          npm version patch -m "chore: bump version to %s"
          
      - name: Push changes
        run: |
          git push
          git push --tags
```

---

## ✅ **Summary**

- **Semantic Versioning** for clear version numbers
- **Git Tags** for release tracking
- **CHANGELOG.md** for release notes
- **Automated versioning** via CI/CD
- **Release process** documented
- **Version display** in application

**Current Version:** v1.0.0-dev
**Next Release:** v1.0.0 (Sakura)
