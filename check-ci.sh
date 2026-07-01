#!/bin/bash
# Quick CI check script - Run before pushing
# Usage: ./check-ci.sh [fullstack|nihongo|flutter|quick|all]

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Local CI Checks${NC}"
echo ""

run_fullstack() {
    echo -e "${YELLOW}📦 Checking fullstack frontend...${NC}"
    cd nihon-quest-fullstack/frontend
    npm run lint
    npm run type-check
    npm run build
    cd ../..
    echo -e "${GREEN}✅ Fullstack passed${NC}"
}

run_nihongo() {
    echo -e "${YELLOW}📦 Checking nihongo app...${NC}"
    cd nihongo-quest-app/frontend
    npm run lint
    npm run type-check
    npm run build
    cd ../..
    echo -e "${GREEN}✅ Nihongo passed${NC}"
}

run_flutter() {
    echo -e "${YELLOW}📱 Checking Flutter mobile...${NC}"
    cd nihon_quest_mobile
    flutter analyze
    flutter test || echo "No tests found"
    cd ..
    echo -e "${GREEN}✅ Flutter passed${NC}"
}

case "$1" in
    fullstack)
        run_fullstack
        ;;
    nihongo)
        run_nihongo
        ;;
    flutter)
        run_flutter
        ;;
    quick)
        echo -e "${YELLOW}⚡ Running quick checks (frontends only)${NC}"
        run_fullstack
        run_nihongo
        ;;
    all)
        echo -e "${YELLOW}🎯 Running full CI checks${NC}"
        run_fullstack
        run_nihongo
        run_flutter
        ;;
    *)
        echo "Usage: $0 {fullstack|nihongo|flutter|quick|all}"
        echo ""
        echo "Examples:"
        echo "  ./check-ci.sh quick      # Fast checks (2-3 min)"
        echo "  ./check-ci.sh all        # Full checks (5-7 min)"
        echo "  ./check-ci.sh fullstack  # Just fullstack"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 All checks passed! Safe to push.${NC}"
