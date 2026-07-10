#!/usr/bin/env bash
# Simple Security Tools Installation (Non-Interactive)
# This version uses non-interactive flags for automation

set -e

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   Security Scanning Tools Setup        ║"
echo "║   Non-Interactive Installation         ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check if brew is installed
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew not found. Install from: https://brew.sh"
    exit 1
fi

echo "📦 Installing security scanning tools..."
echo ""

# 1. Gitleaks (secret scanner - CRITICAL)
echo "🔐 Installing gitleaks (secret scanner)..."
if command -v gitleaks &> /dev/null; then
    echo "   ✓ gitleaks already installed: $(gitleaks version)"
else
    HOMEBREW_NO_AUTO_UPDATE=1 brew install gitleaks
    echo "   ✓ gitleaks installed: $(gitleaks version)"
fi
echo ""

# 2. Semgrep (SAST - static analysis)
echo "🔍 Installing semgrep (static analysis)..."
if command -v semgrep &> /dev/null; then
    echo "   ✓ semgrep already installed: $(semgrep --version | head -1)"
else
    # Use pipx instead of brew for easier installation
    if command -v pipx &> /dev/null; then
        pipx install semgrep
        echo "   ✓ semgrep installed via pipx"
    else
        echo "   ⚠️  pipx not found, installing pipx first..."
        python3 -m pip install --user pipx
        python3 -m pipx ensurepath
        export PATH="$HOME/.local/bin:$PATH"
        pipx install semgrep
        echo "   ✓ semgrep installed via pipx"
    fi
fi
echo ""

# 3. OSV-Scanner (dependency vulnerabilities)
echo "📊 Installing osv-scanner (dependency scanner)..."
if command -v osv-scanner &> /dev/null; then
    echo "   ✓ osv-scanner already installed: $(osv-scanner --version 2>&1 | head -1)"
else
    HOMEBREW_NO_AUTO_UPDATE=1 brew install osv-scanner
    echo "   ✓ osv-scanner installed: $(osv-scanner --version 2>&1 | head -1)"
fi
echo ""

# 4. Trivy (optional but recommended - container/IaC scanner)
echo "🐳 Installing trivy (container/IaC scanner)..."
if command -v trivy &> /dev/null; then
    echo "   ✓ trivy already installed: $(trivy --version | head -1)"
else
    HOMEBREW_NO_AUTO_UPDATE=1 brew install trivy
    echo "   ✓ trivy installed: $(trivy --version | head -1)"
fi
echo ""

echo "╔════════════════════════════════════════╗"
echo "║   ✅ All Tools Installed                ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "📋 Installed tools:"
echo ""
echo "  1. gitleaks    - Secret scanner (catches API keys, tokens)"
echo "  2. semgrep     - Static analysis (finds bugs, vulns)"
echo "  3. osv-scanner - Dependency scanner (CVEs in packages)"
echo "  4. trivy       - Container/IaC scanner (Docker, K8s)"
echo ""
echo "🧪 Test the tools:"
echo ""
echo "  # Scan for secrets"
echo "  gitleaks detect --redact -v"
echo ""
echo "  # Run static analysis"
echo "  semgrep --config auto ."
echo ""
echo "  # Scan dependencies"
echo "  osv-scanner --recursive ."
echo ""
echo "  # Scan Docker/K8s configs"
echo "  trivy config ."
echo ""
echo "🔗 Next steps:"
echo ""
echo "  1. Test gitleaks: make scan-secrets"
echo "  2. Enable pre-commit hook (already installed)"
echo "  3. Push code - pre-push will now scan for secrets!"
echo ""
