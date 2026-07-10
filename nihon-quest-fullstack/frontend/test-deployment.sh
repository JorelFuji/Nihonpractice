#!/bin/bash

# Firebase Deployment Quick Test Script
# Tests critical functionality after deployment

echo "🔥 Firebase Deployment Test Script"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="https://nihonselfpacepractic.web.app"

echo "📍 Testing URL: $BASE_URL"
echo ""

# Test 1: Main page
echo -n "Test 1: Main page loads... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL)
if [ $STATUS -eq 200 ]; then
    echo -e "${GREEN}✅ PASS${NC} (Status: $STATUS)"
else
    echo -e "${RED}❌ FAIL${NC} (Status: $STATUS)"
fi

# Test 2: Geography Game
echo -n "Test 2: Geography Game page... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/geography-game)
if [ $STATUS -eq 200 ]; then
    echo -e "${GREEN}✅ PASS${NC} (Status: $STATUS)"
else
    echo -e "${RED}❌ FAIL${NC} (Status: $STATUS)"
fi

# Test 3: Menu page
echo -n "Test 3: Menu page... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/menu)
if [ $STATUS -eq 200 ]; then
    echo -e "${GREEN}✅ PASS${NC} (Status: $STATUS)"
else
    echo -e "${RED}❌ FAIL${NC} (Status: $STATUS)"
fi

# Test 4: Lessons page
echo -n "Test 4: Lessons page... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/lessons)
if [ $STATUS -eq 200 ]; then
    echo -e "${GREEN}✅ PASS${NC} (Status: $STATUS)"
else
    echo -e "${RED}❌ FAIL${NC} (Status: $STATUS)"
fi

# Test 5: Check for JavaScript bundle
echo -n "Test 5: JavaScript bundle loads... "
RESPONSE=$(curl -s $BASE_URL)
if echo "$RESPONSE" | grep -q "index-.*\.js"; then
    echo -e "${GREEN}✅ PASS${NC}"
else
    echo -e "${RED}❌ FAIL${NC}"
fi

# Test 6: Check for CSS
echo -n "Test 6: CSS stylesheet loads... "
if echo "$RESPONSE" | grep -q "index-.*\.css"; then
    echo -e "${GREEN}✅ PASS${NC}"
else
    echo -e "${RED}❌ FAIL${NC}"
fi

# Test 7: Response time
echo -n "Test 7: Response time check... "
TIME=$(curl -s -o /dev/null -w "%{time_total}" $BASE_URL)
if (( $(echo "$TIME < 3.0" | bc -l) )); then
    echo -e "${GREEN}✅ PASS${NC} (${TIME}s)"
else
    echo -e "${YELLOW}⚠️  SLOW${NC} (${TIME}s)"
fi

echo ""
echo "===================================="
echo "🎉 Quick tests complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Open $BASE_URL in browser"
echo "2. Test Geography Game manually"
echo "3. Check language toggle in header"
echo "4. Complete quiz and verify stats"
echo "5. Test on mobile device"
echo ""
echo "📄 Full testing checklist: FIREBASE_TESTING_CHECKLIST.md"
echo ""
