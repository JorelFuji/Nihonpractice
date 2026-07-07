#!/usr/bin/env bash
# CI Defense System Setup
# Installs pre-push hooks and configures git for optimal CI minute usage
# Run this in any repo to set up the three-tier defense

set -e

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   CI/CD Defense System Setup           ║"
echo "║   Prevent GitLab Minute Exhaustion     ║"
echo "╚════════════════════════════════════════╝"
echo ""

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
cd "$REPO_ROOT"

echo "📍 Repository: $(basename "$REPO_ROOT")"
echo ""

# Step 1: Create .githooks directory
echo "🔧 Step 1/5: Creating .githooks directory..."
mkdir -p .githooks

# Step 2: Install pre-push hook
echo "🔧 Step 2/5: Installing pre-push hook..."
if [ -f ".githooks/pre-push" ]; then
    echo "   ✓ pre-push hook already exists"
else
    cat > .githooks/pre-push << 'HOOK_EOF'
#!/usr/bin/env bash
# Pre-push hook: Run local CI to prevent wasting GitLab/GitHub minutes
set -e

echo ""
echo "🚀 Running local CI checks before push..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Detect which CI system to use
if [ -f "Makefile" ] && grep -q "^ci:" Makefile; then
    CI_COMMAND="make ci"
elif [ -f "package.json" ] && grep -q '"ci:' package.json; then
    CI_COMMAND="npm run ci"
elif [ -f "pyproject.toml" ] || [ -f "setup.py" ]; then
    CI_COMMAND="pytest && ruff check ."
else
    echo "⚠️  No CI configuration found"
    echo "   Skipping pre-push checks"
    exit 0
fi

echo "Running: $CI_COMMAND"
echo ""

if ! $CI_COMMAND; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "❌ LOCAL CI FAILED"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Push BLOCKED to save CI minutes."
    echo ""
    echo "Options:"
    echo "  1. Fix issues and try again"
    echo "  2. Skip check: git push --no-verify"
    echo "  3. Docs only: add [skip ci] to commit message"
    echo ""
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ LOCAL CI PASSED"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
exit 0
HOOK_EOF
    chmod +x .githooks/pre-push
    echo "   ✓ Created and made executable"
fi

# Step 3: Configure git to use .githooks
echo "🔧 Step 3/5: Configuring git hooks path..."
git config core.hooksPath .githooks
echo "   ✓ Git now uses .githooks/ directory"

# Step 4: Configure remotes if not already set
echo "🔧 Step 4/5: Checking remote configuration..."

HAS_ORIGIN=$(git remote | grep -w "origin" || true)
HAS_GITHUB=$(git remote | grep -w "github" || true)

if [ -n "$HAS_ORIGIN" ] && [ -n "$HAS_GITHUB" ]; then
    ORIGIN_URL=$(git remote get-url origin)
    GITHUB_URL=$(git remote get-url github)
    
    echo "   ✓ Remotes configured:"
    if [[ "$ORIGIN_URL" == *"gitlab"* ]]; then
        echo "     - origin  → GitLab (deployment)"
        echo "     - github  → GitHub (feature CI)"
    elif [[ "$ORIGIN_URL" == *"github"* ]]; then
        echo "     - origin  → GitHub (feature CI)"
        echo "     - github  → (secondary)"
    fi
else
    echo "   ⚠️  Only one remote found - consider adding both GitLab and GitHub"
fi

# Step 5: Create/update .gitignore
echo "🔧 Step 5/5: Updating .gitignore..."
if ! grep -q "^.history/" .gitignore 2>/dev/null; then
    echo ".history/" >> .gitignore
    echo "   ✓ Added .history/ to .gitignore"
else
    echo "   ✓ .gitignore already configured"
fi

# Summary
echo ""
echo "╔════════════════════════════════════════╗"
echo "║   ✅ CI Defense System Installed       ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "📋 What was configured:"
echo ""
echo "  1. ✓ Pre-push hook installed (.githooks/pre-push)"
echo "  2. ✓ Git configured to use custom hooks"
echo "  3. ✓ Remote repositories checked"
echo "  4. ✓ .gitignore updated"
echo ""
echo "🚀 Next steps:"
echo ""
echo "  • Test the hook:"
echo "    git commit --allow-empty -m 'test: hook check'"
echo "    git push"
echo ""
echo "  • Daily workflow:"
echo "    git push github feature/my-branch  (uses GitHub Actions)"
echo "    git push origin main               (uses GitLab for deploy)"
echo ""
echo "  • Bypass hook if needed:"
echo "    git push --no-verify"
echo ""
echo "  • Docs/minor changes:"
echo "    git commit -m 'docs: update [skip ci]'"
echo ""
echo "💡 The pre-push hook will run 'make ci' before every push."
echo "   Failed checks = blocked push = saved CI minutes!"
echo ""
