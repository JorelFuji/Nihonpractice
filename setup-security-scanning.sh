#!/usr/bin/env bash
# Complete Security Scanning Setup
# Installs tools, configures hooks, and sets up the 5-layer pyramid

set -e

echo ""
echo "╔════════════════════════════════════════════════╗"
echo "║   🔒 SECURITY SCANNING SETUP                   ║"
echo "║   The 5-Layer Pyramid for Secure Development  ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
cd "$REPO_ROOT"

# Step 1: Install security tools
echo "═══════════════════════════════════════════════════"
echo "📦 STEP 1/5: Install Security Tools"
echo "═══════════════════════════════════════════════════"
echo ""

if [ ! -f "install-security-tools.sh" ]; then
    echo "❌ install-security-tools.sh not found"
    exit 1
fi

chmod +x install-security-tools.sh
./install-security-tools.sh

# Step 2: Configure pre-commit hook
echo ""
echo "═══════════════════════════════════════════════════"
echo "🔍 STEP 2/5: Configure Pre-Commit Hook"
echo "═══════════════════════════════════════════════════"
echo ""

mkdir -p .githooks

if [ ! -f ".githooks/pre-commit" ]; then
    echo "❌ .githooks/pre-commit not found"
    echo "   Expected to be created by setup-ci-defense.sh"
    exit 1
fi

chmod +x .githooks/pre-commit
echo "✓ Pre-commit hook configured (fast: lint + secrets)"

# Step 3: Configure pre-push hook
echo ""
echo "═══════════════════════════════════════════════════"
echo "🚀 STEP 3/5: Configure Pre-Push Hook"
echo "═══════════════════════════════════════════════════"
echo ""

if [ ! -f ".githooks/pre-push" ]; then
    echo "❌ .githooks/pre-push not found"
    echo "   Run: ./setup-ci-defense.sh first"
    exit 1
fi

chmod +x .githooks/pre-push
echo "✓ Pre-push hook configured (full: lint + test + scan)"

# Step 4: Configure git hooks path
echo ""
echo "═══════════════════════════════════════════════════"
echo "⚙️  STEP 4/5: Configure Git"
echo "═══════════════════════════════════════════════════"
echo ""

git config core.hooksPath .githooks
echo "✓ Git configured to use .githooks/"

# Step 5: Configure lint-staged (if using Node)
echo ""
echo "═══════════════════════════════════════════════════"
echo "✨ STEP 5/5: Configure Lint-Staged (Optional)"
echo "═══════════════════════════════════════════════════"
echo ""

if [ -f "package.json" ]; then
    if ! grep -q "lint-staged" package.json; then
        echo "⚠️  lint-staged not configured in package.json"
        echo ""
        echo "Add this to package.json:"
        echo ""
        cat << 'EOF'
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  },
  "scripts": {
    "prepare": "cd ../.. && git config core.hooksPath .githooks"
  }
EOF
        echo ""
    else
        echo "✓ lint-staged already configured"
    fi
fi

# Summary
echo ""
echo "╔════════════════════════════════════════════════╗"
echo "║   ✅ SECURITY SCANNING SETUP COMPLETE          ║"
echo "╚════════════════════════════════════════════════╝"
echo ""
echo "📊 The 5-Layer Pyramid is now active:"
echo ""
echo "  Layer 1: Dev inner loop"
echo "           • Run: ./dev-loop.sh"
echo "           • Instant feedback (watch mode)"
echo ""
echo "  Layer 2: Pre-commit hook ✅"
echo "           • Runs on: git commit"
echo "           • Checks: Lint + secret scan (staged files)"
echo "           • Speed: 1-2 seconds"
echo ""
echo "  Layer 3: Pre-push hook ✅"
echo "           • Runs on: git push"
echo "           • Checks: Lint + test + scan + build"
echo "           • Speed: 2-3 minutes"
echo ""
echo "  Layer 4: CI (thin confirmation) ✅"
echo "           • Runs on: push to GitHub/GitLab"
echo "           • Same checks as pre-push"
echo "           • Speed: 5-8 minutes"
echo ""
echo "  Layer 5: Deep scans ⏰"
echo "           • Runs: Weekly (scheduled)"
echo "           • Checks: SAST + CVE + full audit"
echo "           • Speed: 5-10 minutes"
echo ""
echo "🧪 Test the setup:"
echo ""
echo "  # Test pre-commit hook"
echo "  echo '# test' >> test.txt"
echo "  git add test.txt"
echo "  git commit -m 'test: pre-commit hook'"
echo "  # Should run gitleaks + lint-staged"
echo ""
echo "  # Test pre-push hook"
echo "  git push github test-branch"
echo "  # Should run full make ci"
echo ""
echo "🔒 Security tools installed:"
echo ""
echo "  • gitleaks    - Secret scanner (catches API keys)"
echo "  • semgrep     - SAST (finds bugs/vulns)"
echo "  • osv-scanner - Dependency CVE scanner"
echo "  • trivy       - Container/IaC scanner"
echo ""
echo "💡 Manual scans:"
echo ""
echo "  make scan        # Fast scans (~10s)"
echo "  make scan-deep   # Deep scans (~2-5 min)"
echo ""
echo "🚀 You're now protected from:"
echo "  ✓ Committing API keys/secrets"
echo "  ✓ Pushing broken code"
echo "  ✓ Wasting CI minutes on failures"
echo "  ✓ Deploying vulnerable dependencies"
echo ""
