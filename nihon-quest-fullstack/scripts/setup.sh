#!/bin/bash

# Nihon Quest - Setup Script
# Automated setup for development environment

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎌 Nihon Quest - Setup Script${NC}"
echo "======================================"
echo ""

# Check Node.js
echo -e "${YELLOW}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js $NODE_VERSION${NC}"

# Check npm
echo -e "${YELLOW}Checking npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found${NC}"
    exit 1
fi
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm $NPM_VERSION${NC}"

# Check Firebase CLI
echo -e "${YELLOW}Checking Firebase CLI...${NC}"
if ! command -v firebase &> /dev/null; then
    echo -e "${YELLOW}⚠️  Firebase CLI not found. Installing...${NC}"
    npm install -g firebase-tools
    echo -e "${GREEN}✅ Firebase CLI installed${NC}"
else
    FIREBASE_VERSION=$(firebase --version)
    echo -e "${GREEN}✅ Firebase CLI $FIREBASE_VERSION${NC}"
fi

# Install frontend dependencies
echo ""
echo -e "${YELLOW}Installing frontend dependencies...${NC}"
cd frontend
npm install
echo -e "${GREEN}✅ Frontend dependencies installed${NC}"

# Install functions dependencies
echo ""
echo -e "${YELLOW}Installing functions dependencies...${NC}"
cd ../functions
npm install
echo -e "${GREEN}✅ Functions dependencies installed${NC}"

# Create necessary directories
echo ""
echo -e "${YELLOW}Creating directories...${NC}"
mkdir -p ../frontend/scripts
mkdir -p ../frontend/dist
echo -e "${GREEN}✅ Directories created${NC}"

# Firebase login check
echo ""
echo -e "${YELLOW}Checking Firebase authentication...${NC}"
if firebase projects:list &> /dev/null; then
    echo -e "${GREEN}✅ Firebase authenticated${NC}"
else
    echo -e "${YELLOW}⚠️  Not logged in to Firebase${NC}"
    echo -e "${BLUE}Run: firebase login${NC}"
fi

# Summary
echo ""
echo -e "${GREEN}======================================"
echo "✅ Setup Complete!"
echo "======================================${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. Run: ${YELLOW}make dev${NC} - Start development server"
echo "  2. Run: ${YELLOW}make help${NC} - See all available commands"
echo "  3. Run: ${YELLOW}make deploy${NC} - Deploy to Firebase"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo "  - DEVOPS_TOOLING.md - Complete tooling guide"
echo "  - Makefile - Quick command reference"
echo ""
echo -e "${GREEN}Happy coding! 🎌${NC}"
