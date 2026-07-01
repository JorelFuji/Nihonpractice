# Contributing to NihonPractice

Thank you for your interest in contributing to NihonPractice! This document provides guidelines and instructions for contributing to the project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

---

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Harassment, trolling, or derogatory comments
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of unacceptable behavior may be reported to the project team. All complaints will be reviewed and investigated promptly and fairly.

---

## 🎯 How Can I Contribute?

### Reporting Bugs

**Before submitting a bug report:**
1. Check the [GitHub Issues](https://github.com/JorelFuji/Nihonpractice/issues) to see if it's already reported
2. Test with the latest version
3. Verify the issue is reproducible

**When submitting a bug report, include:**
- **Title:** Clear, descriptive title
- **Description:** Detailed description of the issue
- **Steps to Reproduce:** Numbered list of steps
- **Expected Behavior:** What should happen
- **Actual Behavior:** What actually happens
- **Screenshots:** If applicable
- **Environment:**
  - Browser/OS version
  - Device (desktop/mobile)
  - URL where issue occurred
- **Additional Context:** Any other relevant information

**Bug Report Template:**
```markdown
## Bug Description
[Clear description of the bug]

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Screenshots
[If applicable]

## Environment
- Browser: Chrome 115
- OS: macOS 13.4
- Device: Desktop
- URL: https://nihonselfpacepractic.web.app/games/memory-match/

## Additional Context
[Any other information]
```

---

### Suggesting Enhancements

**Before submitting an enhancement:**
1. Check if it's already suggested in Issues
2. Consider if it fits the project's goals
3. Think about implementation complexity

**When suggesting an enhancement, include:**
- **Title:** Clear, descriptive title
- **Description:** Detailed description
- **Use Case:** Why is this enhancement needed?
- **Proposed Solution:** How should it work?
- **Alternatives:** Other solutions considered
- **Additional Context:** Mockups, examples, etc.

**Enhancement Template:**
```markdown
## Enhancement Description
[What feature do you want to add?]

## Use Case
[Why is this needed? Who would benefit?]

## Proposed Solution
[How should it work?]

## Alternatives Considered
[Other solutions you've thought about]

## Mockups/Examples
[Visual aids if applicable]

## Additional Context
[Any other information]
```

---

### Contributing Code

**Types of contributions we welcome:**
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ♿ Accessibility improvements
- 🌐 Translations (Japanese accuracy)
- ⚡ Performance optimizations
- 🧪 Test coverage
- 🔧 Build/tooling improvements

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your copy of the repository.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/Nihonpractice.git
cd NihonSelfPace
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/JorelFuji/Nihonpractice.git
```

### 4. Install Dependencies

```bash
# For web development
cd firebase-hosting
npm install

# For Flutter app
cd nihon_quest_mobile
flutter pub get

# For React frontend
cd nihon-quest-fullstack/frontend
npm install
```

### 5. Set Up Firebase (Optional)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Set project
firebase use nihonselfpacepractic
```

---

## 💻 Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work. Follow the naming convention:

```bash
# Update main
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

**Branch naming convention:**
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `docs/` - Documentation updates
- `chore/` - Maintenance tasks
- `test/` - Test improvements

**Examples:**
```bash
git checkout -b feature/add-vocabulary-audio
git checkout -b bugfix/memory-game-crash
git checkout -b docs/update-readme
```

### 2. Make Your Changes

**Follow these guidelines:**
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Ensure Japanese text is accurate
- Test on multiple devices/browsers
- Keep commits focused and atomic

### 3. Test Your Changes

```bash
# Test locally
cd firebase-hosting
firebase serve --only hosting

# Open in browser
# Visit http://localhost:5000

# Test on mobile (use your local IP)
# Visit http://192.168.1.X:5000
```

### 4. Commit Your Changes

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
git add .
git commit -m "feat: add vocabulary audio playback"
```

### 5. Keep Your Branch Updated

```bash
# Fetch latest changes
git fetch upstream

# Rebase on main
git rebase upstream/main

# Or merge
git merge upstream/main
```

### 6. Push Your Changes

```bash
git push origin feature/your-feature-name
```

### 7. Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill in the PR template
5. Submit for review

---

## 📏 Coding Standards

### HTML

```html
<!-- Use semantic HTML5 elements -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<!-- Use meaningful class names -->
<div class="game-card">
  <h2 class="game-title">Memory Match</h2>
</div>

<!-- Include alt text for images -->
<img src="icon.png" alt="Memory Match game icon">
```

### CSS

```css
/* Use Tailwind CSS utilities when possible */
.game-card {
  @apply bg-white/10 backdrop-blur-lg rounded-3xl p-8;
}

/* Group related properties */
.button {
  /* Positioning */
  position: relative;
  
  /* Display & Box Model */
  display: inline-block;
  padding: 1rem 2rem;
  
  /* Color */
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;
  
  /* Text */
  font-size: 1rem;
  font-weight: 700;
  
  /* Other */
  border-radius: 1rem;
  transition: all 0.3s ease;
}
```

### JavaScript

```javascript
// Use descriptive variable names
const vocabularyWords = [];
const selectedCategory = 'food';

// Use const by default, let when reassignment is needed
const API_KEY = 'your-key';
let currentScore = 0;

// Use template literals
console.log(`Score: ${currentScore}`);

// Use arrow functions
const filterWords = (words, category) => {
  return words.filter(word => word.category === category);
};

// Add JSDoc comments for functions
/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffle(array) {
  // Implementation
}

// Handle errors gracefully
try {
  const data = JSON.parse(localStorage.getItem('highScore'));
} catch (error) {
  console.error('Failed to parse high score:', error);
}
```

### File Organization

```javascript
// Order of code sections:
// 1. Constants
const CATEGORY_COLORS = {
  food: 'bg-red-500',
  animals: 'bg-blue-500'
};

// 2. State variables
let currentGame = null;
let highScore = 0;

// 3. Initialization
document.addEventListener('DOMContentLoaded', initGame);

// 4. Main functions
function initGame() {
  loadHighScore();
  renderCategories();
  attachEventListeners();
}

// 5. Helper functions
function loadHighScore() {
  // Implementation
}

// 6. Event handlers
function handleCardClick(event) {
  // Implementation
}

// 7. Utility functions
function shuffle(array) {
  // Implementation
}
```

---

## ✍️ Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style (formatting, semicolons, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `ci:` - CI/CD changes
- `build:` - Build system changes
- `revert:` - Revert a previous commit

### Examples

**Simple commit:**
```bash
git commit -m "feat: add audio playback for vocabulary"
```

**Detailed commit:**
```bash
git commit -m "feat: add audio playback for vocabulary

- Add audio files for all 70+ vocabulary words
- Implement playback controls in Memory Match game
- Add speaker icon to each card
- Update vocabulary data structure with audio URLs

Closes #123"
```

**Bug fix:**
```bash
git commit -m "fix: resolve card flip animation on iOS

The card flip animation was not working on iOS Safari
due to transform-style: preserve-3d not being supported.
Changed to use opacity-based animation as fallback.

Fixes #456"
```

**Breaking change:**
```bash
git commit -m "feat!: update vocabulary data structure

BREAKING CHANGE: Vocabulary object structure changed
from {word, translation} to {japanese, romaji, english, emoji}.
See migration guide in docs.

Closes #789"
```

---

## 🔍 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Comments added for complex logic
- [ ] All tests pass
- [ ] Documentation updated if needed
- [ ] Japanese text verified for accuracy
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices
- [ ] No console errors or warnings
- [ ] Commit messages follow convention
- [ ] Branch is up to date with main

### PR Template

When creating a PR, use this template:

```markdown
## Description
[Describe what this PR does]

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that causes existing functionality to break)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Related Issue
Closes #[issue number]

## Changes Made
- [Change 1]
- [Change 2]
- [Change 3]

## Testing
- [ ] Tested locally
- [ ] Tested on mobile
- [ ] Tested on multiple browsers
- [ ] All existing tests pass
- [ ] Added new tests (if applicable)

## Screenshots
[If applicable, add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Japanese text verified

## Additional Notes
[Any additional information]
```

### Review Process

1. **Automated Checks:** CI/CD runs automatically
2. **Code Review:** Maintainer reviews your code
3. **Feedback:** Address any requested changes
4. **Approval:** PR gets approved
5. **Merge:** PR is merged to main
6. **Deployment:** Changes deployed to production

### After Merge

```bash
# Update your local main
git checkout main
git pull upstream main

# Delete feature branch
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

---

## 🧪 Testing Guidelines

### Manual Testing

**Test checklist:**
- [ ] All pages load correctly
- [ ] All links work
- [ ] All buttons function
- [ ] Forms validate properly
- [ ] Games play correctly
- [ ] Japanese text displays correctly
- [ ] Responsive on mobile
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] No console errors
- [ ] Performance is acceptable

### Browser Testing

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE 11 (not officially supported, but should degrade gracefully)

### Mobile Testing

Test on:
- ✅ iPhone (Safari)
- ✅ Android (Chrome)
- ✅ iPad/Tablet
- ✅ Various screen sizes

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Sufficient color contrast
- [ ] Alt text for images
- [ ] Semantic HTML used
- [ ] ARIA labels where needed

---

## 📝 Documentation

### When to Update Documentation

Update documentation when:
- Adding new features
- Changing existing functionality
- Fixing bugs that affect usage
- Adding configuration options
- Improving setup process

### Documentation Files

- **README.md** - Project overview, setup, usage
- **CHANGELOG.md** - Version history
- **CONTRIBUTING.md** - This file
- **BRANCHING_STRATEGY.md** - Git workflow
- **Game-specific docs** - In /docs folder

### Writing Style

- Use clear, concise language
- Include code examples
- Add screenshots/diagrams when helpful
- Keep formatting consistent
- Use proper Markdown syntax

---

## 👥 Community

### Communication Channels

- **GitHub Issues** - Bug reports, feature requests
- **GitHub Discussions** - General discussions, questions
- **Pull Requests** - Code contributions

### Getting Help

**Need help contributing?**
1. Check existing documentation
2. Search closed issues
3. Ask in GitHub Discussions
4. Contact maintainers

### Recognition

Contributors will be:
- Listed in project credits
- Mentioned in release notes
- Thanked in community updates

---

## 🎯 Priority Areas

We especially welcome contributions in:

1. **Japanese Content Accuracy**
   - Verify vocabulary translations
   - Check grammar in learning materials
   - Improve hiragana/katakana displays

2. **Accessibility**
   - Improve keyboard navigation
   - Add ARIA labels
   - Enhance screen reader support

3. **Mobile Experience**
   - Optimize touch interactions
   - Improve responsive layouts
   - Reduce mobile load times

4. **Testing**
   - Add automated tests
   - Improve test coverage
   - Create E2E tests

5. **Documentation**
   - Improve setup guides
   - Add tutorials
   - Create video walkthroughs

---

## 📜 License

By contributing to NihonPractice, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Thank You!

Thank you for taking the time to contribute to NihonPractice! Your contributions help make Japanese learning accessible and fun for everyone.

**ありがとうございます！(Arigatou gozaimasu! - Thank you very much!)**

---

## 📞 Questions?

If you have questions about contributing, please:
- Open a GitHub Discussion
- Check existing documentation
- Contact the maintainers

**Happy coding! がんばって！(Ganbatte! - Do your best!)** 🎌💻✨

---

**Last Updated:** July 1, 2026  
**Maintained By:** JorelFuji  
**Version:** 1.0
