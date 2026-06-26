#!/bin/bash

# Firebase Hosting Deployment Script for NihongoQuest

echo "🔥 Deploying NihongoQuest to Firebase Hosting..."
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo -e "${YELLOW}Firebase CLI not found. Installing...${NC}"
    npm install -g firebase-tools
fi

# Step 1: Build the app
echo -e "${GREEN}📦 Building production app...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Build successful!${NC}"
echo ""

# Step 2: Deploy to Firebase
echo -e "${GREEN}🚀 Deploying to Firebase Hosting...${NC}"
firebase deploy --only hosting

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed!"
    exit 1
fi

echo ""
echo -e "${GREEN}✨ Deployment successful!${NC}"
echo ""
echo "Your app is now live at:"
echo -e "${YELLOW}🌐 https://nihonselfpacepractic.web.app${NC}"
echo -e "${YELLOW}🌐 https://nihonselfpacepractic.firebaseapp.com${NC}"
echo ""
