#!/bin/bash
# NihongoQuest - Automated Deployment Script
# Usage: ./deploy.sh [dev|staging|prod]

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-prod}
PROJECT_DIR="/Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile"
FIREBASE_PROJECT="nihonselfpacepractic-flutter"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}🚀 NihongoQuest Deployment Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${YELLOW}Environment: ${ENVIRONMENT}${NC}"
echo -e "${YELLOW}Project: ${FIREBASE_PROJECT}${NC}"
echo ""

# Function to print status
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check prerequisites
echo -e "${BLUE}Step 1: Checking prerequisites...${NC}"

if ! command -v flutter &> /dev/null; then
    print_error "Flutter not found. Install from https://flutter.dev"
    exit 1
fi
print_status "Flutter installed"

if ! command -v firebase &> /dev/null; then
    print_error "Firebase CLI not found. Run: npm install -g firebase-tools"
    exit 1
fi
print_status "Firebase CLI installed"

# Navigate to project
cd "$PROJECT_DIR" || exit 1
print_status "Changed to project directory"

echo ""
echo -e "${BLUE}Step 2: Running Flutter doctor...${NC}"
flutter doctor --version
echo ""

# Get dependencies
echo -e "${BLUE}Step 3: Getting dependencies...${NC}"
flutter pub get
if [ $? -eq 0 ]; then
    print_status "Dependencies installed"
else
    print_error "Failed to get dependencies"
    exit 1
fi

# Run tests (optional)
if [ "$ENVIRONMENT" == "prod" ]; then
    echo ""
    echo -e "${BLUE}Step 4: Running tests...${NC}"
    flutter test --no-pub
    if [ $? -eq 0 ]; then
        print_status "Tests passed"
    else
        print_warning "Tests failed (continuing anyway)"
    fi
fi

# Build for web
echo ""
echo -e "${BLUE}Step 5: Building for web (release mode)...${NC}"
echo -e "${YELLOW}This may take 2-5 minutes...${NC}"

flutter build web --release \
    --base-href="/" \
    --no-tree-shake-icons

if [ $? -eq 0 ]; then
    print_status "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Check build output
if [ ! -d "build/web" ]; then
    print_error "Build directory not found"
    exit 1
fi

BUILD_SIZE=$(du -sh build/web | cut -f1)
print_status "Build size: $BUILD_SIZE"

# Deploy to Firebase Hosting
echo ""
echo -e "${BLUE}Step 6: Deploying to Firebase Hosting...${NC}"
echo -e "${YELLOW}Project: ${FIREBASE_PROJECT}${NC}"

case "$ENVIRONMENT" in
    dev)
        firebase hosting:channel:deploy dev --project "$FIREBASE_PROJECT"
        ;;
    staging)
        firebase hosting:channel:deploy staging --project "$FIREBASE_PROJECT"
        ;;
    prod)
        firebase deploy --only hosting --project "$FIREBASE_PROJECT"
        ;;
    *)
        print_error "Invalid environment: $ENVIRONMENT"
        exit 1
        ;;
esac

if [ $? -eq 0 ]; then
    print_status "Deployment successful!"
else
    print_error "Deployment failed"
    exit 1
fi

# Display URLs
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

case "$ENVIRONMENT" in
    prod)
        echo -e "${BLUE}🌐 Live URL:${NC}"
        echo -e "   https://nihonselfpacepractic-flutter.web.app/"
        echo -e "   https://nihonselfpacepractic-flutter.firebaseapp.com/"
        ;;
    dev)
        echo -e "${BLUE}🌐 Dev Preview URL:${NC}"
        echo -e "   https://nihonselfpacepractic-flutter--dev-*.web.app/"
        ;;
    staging)
        echo -e "${BLUE}🌐 Staging Preview URL:${NC}"
        echo -e "   https://nihonselfpacepractic-flutter--staging-*.web.app/"
        ;;
esac

echo ""
echo -e "${YELLOW}📝 Remember to:${NC}"
echo -e "   1. Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)"
echo -e "   2. Test all 6 games"
echo -e "   3. Verify high scores persist"
echo -e "   4. Check on mobile devices"
echo ""
echo -e "${GREEN}Happy deploying! 🎉${NC}"
