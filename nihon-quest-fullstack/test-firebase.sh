#!/bin/bash

# Firebase Connection Test Script
# Tests all Firebase services for NihongoQuest

echo "🔥 Firebase Connection Test"
echo "============================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PROJECT_ID="nihonselfpacepractic"
API_KEY="AIzaSyAEZ-4sPafZkPUseFK4hRN1q4-Vv-eEq_I"

echo -e "${BLUE}📋 Project Information:${NC}"
echo "  Project ID: $PROJECT_ID"
echo "  Auth Domain: ${PROJECT_ID}.firebaseapp.com"
echo ""

echo -e "${BLUE}🌐 Your Firebase URLs:${NC}"
echo ""
echo -e "${GREEN}Firebase Console:${NC}"
echo "  https://console.firebase.google.com/project/${PROJECT_ID}/overview"
echo ""
echo -e "${GREEN}Firebase Hosting:${NC}"
echo "  https://${PROJECT_ID}.web.app"
echo "  https://${PROJECT_ID}.firebaseapp.com"
echo ""
echo -e "${GREEN}Authentication Console:${NC}"
echo "  https://console.firebase.google.com/project/${PROJECT_ID}/authentication/users"
echo ""
echo -e "${GREEN}Firestore Console:${NC}"
echo "  https://console.firebase.google.com/project/${PROJECT_ID}/firestore"
echo ""
echo -e "${GREEN}Analytics Console:${NC}"
echo "  https://console.firebase.google.com/project/${PROJECT_ID}/analytics"
echo ""

echo -e "${BLUE}🧪 Running Connection Tests...${NC}"
echo ""

# Test 1: Check if Firebase API is reachable
echo -n "1. Testing Firebase API connectivity... "
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}")
if [ "$RESPONSE" = "400" ] || [ "$RESPONSE" = "200" ]; then
    echo -e "${GREEN}✓ Connected${NC} (HTTP $RESPONSE)"
else
    echo -e "${RED}✗ Failed${NC} (HTTP $RESPONSE)"
fi

# Test 2: Check Firestore API
echo -n "2. Testing Firestore API... "
FIRESTORE_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents")
if [ "$FIRESTORE_RESPONSE" = "200" ] || [ "$FIRESTORE_RESPONSE" = "403" ]; then
    echo -e "${GREEN}✓ Connected${NC} (HTTP $FIRESTORE_RESPONSE)"
else
    echo -e "${RED}✗ Failed${NC} (HTTP $FIRESTORE_RESPONSE)"
fi

# Test 3: Check if project exists
echo -n "3. Testing project existence... "
PROJECT_CHECK=$(curl -s "https://${PROJECT_ID}.firebaseapp.com/__/firebase/init.json")
if [ ! -z "$PROJECT_CHECK" ]; then
    echo -e "${GREEN}✓ Project exists${NC}"
else
    echo -e "${YELLOW}⚠ Check manually${NC}"
fi

echo ""
echo -e "${BLUE}📝 Next Steps:${NC}"
echo ""
echo "1. Open Firebase Console:"
echo -e "   ${YELLOW}https://console.firebase.google.com/project/${PROJECT_ID}${NC}"
echo ""
echo "2. Enable these services:"
echo "   • Authentication (Email/Password + Google)"
echo "   • Firestore Database"
echo "   • Analytics"
echo ""
echo "3. Test in browser:"
echo -e "   ${YELLOW}open frontend/src/test-firebase.html${NC}"
echo ""
echo -e "${GREEN}✨ Run this to open Firebase Console:${NC}"
echo -e "   ${YELLOW}open https://console.firebase.google.com/project/${PROJECT_ID}${NC}"
