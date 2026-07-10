#!/bin/bash
set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 Starting Local Test & Scan Workflow...${NC}"
echo ""

# Track failures
FAILED=0

# 1. Security Scan
echo -e "${BLUE}🔒 Step 1: Security Scan${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v gitleaks &> /dev/null; then
    if gitleaks detect --no-git; then
        echo -e "${GREEN}✅ No secrets detected${NC}"
    else
        echo -e "${RED}❌ Security issues found!${NC}"
        FAILED=1
    fi
else
    echo -e "${YELLOW}⚠️  gitleaks not installed, skipping...${NC}"
    echo "Install with: brew install gitleaks"
fi
echo ""

# 2. Check current branch
echo -e "${BLUE}🌿 Step 2: Branch Check${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" = "main" ]; then
    echo -e "${RED}❌ WARNING: You are on main branch!${NC}"
    echo -e "${YELLOW}   Create a feature branch instead:${NC}"
    echo "   git checkout -b feature/my-feature"
    FAILED=1
else
    echo -e "${GREEN}✅ On feature branch: $CURRENT_BRANCH${NC}"
fi
echo ""

# 3. Lint Check - Fullstack
echo -e "${BLUE}📝 Step 3: Lint Check (Fullstack Frontend)${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -d "nihon-quest-fullstack/frontend" ]; then
    cd nihon-quest-fullstack/frontend
    if npm run lint; then
        echo -e "${GREEN}✅ Lint passed${NC}"
    else
        echo -e "${RED}❌ Lint failed${NC}"
        FAILED=1
    fi
    cd ../..
fi
echo ""

# 4. Lint Check - Nihongo
echo -e "${BLUE}📝 Step 4: Lint Check (Nihongo Frontend)${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -d "nihongo-quest-app/frontend" ]; then
    cd nihongo-quest-app/frontend
    if npm run lint; then
        echo -e "${GREEN}✅ Lint passed${NC}"
    else
        echo -e "${RED}❌ Lint failed${NC}"
        FAILED=1
    fi
    cd ../..
fi
echo ""

# 5. Type Check
echo -e "${BLUE}🔍 Step 5: TypeScript Type Check${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -d "nihon-quest-fullstack/frontend" ]; then
    cd nihon-quest-fullstack/frontend
    if npm run type-check; then
        echo -e "${GREEN}✅ Type check passed${NC}"
    else
        echo -e "${RED}❌ Type check failed${NC}"
        FAILED=1
    fi
    cd ../..
fi
echo ""

# 6. Build Check
echo -e "${BLUE}🔨 Step 6: Build Check${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -d "nihon-quest-fullstack/frontend" ]; then
    cd nihon-quest-fullstack/frontend
    if npm run build; then
        echo -e "${GREEN}✅ Build successful${NC}"
    else
        echo -e "${RED}❌ Build failed${NC}"
        FAILED=1
    fi
    cd ../..
fi
echo ""

# 7. Flutter Tests
echo -e "${BLUE}📱 Step 7: Flutter Tests${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v flutter &> /dev/null; then
    if [ -d "nihon_quest_mobile" ]; then
        cd nihon_quest_mobile
        if flutter test; then
            echo -e "${GREEN}✅ Flutter tests passed${NC}"
        else
            echo -e "${YELLOW}⚠️  Flutter tests failed or not configured${NC}"
        fi
        cd ..
    fi
else
    echo -e "${YELLOW}⚠️  Flutter not installed, skipping...${NC}"
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All local tests completed successfully!${NC}"
    echo ""
    echo -e "${BLUE}🚀 Ready to push! Next steps:${NC}"
    echo "   1. git add ."
    echo "   2. git commit -m 'your message'"
    echo "   3. git push origin $CURRENT_BRANCH"
    echo "   4. Create Pull Request on GitHub"
    exit 0
else
    echo -e "${RED}❌ Some tests failed!${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  Fix the issues above before pushing${NC}"
    exit 1
fi
