#!/bin/bash

# Vercel Deployment Script
# Usage: ./deploy-vercel.sh [fullstack|nihongo|both]

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

PROJECT=${1:-fullstack}

echo -e "${BLUE}🚀 Vercel Deployment Script${NC}"
echo ""

# Function to deploy a project
deploy_project() {
    local project_name=$1
    local project_path=$2
    
    echo -e "${BLUE}📦 Deploying ${project_name}...${NC}"
    cd "$project_path"
    
    # Check if vercel is installed
    if ! command -v vercel &> /dev/null; then
        echo -e "${RED}❌ Vercel CLI not found${NC}"
        echo "Install with: npm install -g vercel"
        exit 1
    fi
    
    # Check if logged in
    if ! vercel whoami &> /dev/null; then
        echo -e "${BLUE}🔐 Please login to Vercel...${NC}"
        vercel login
    fi
    
    # Test build first
    echo -e "${BLUE}🔨 Testing build...${NC}"
    npm run build
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Build successful!${NC}"
    else
        echo -e "${RED}❌ Build failed${NC}"
        exit 1
    fi
    
    # Deploy
    echo -e "${BLUE}🚀 Deploying to Vercel...${NC}"
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ ${project_name} deployed successfully!${NC}"
    else
        echo -e "${RED}❌ Deployment failed${NC}"
        exit 1
    fi
    
    cd - > /dev/null
}

# Main deployment logic
case $PROJECT in
    fullstack)
        echo -e "${BLUE}Deploying Nihon Quest Fullstack...${NC}"
        deploy_project "Nihon Quest Fullstack" "/Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend"
        ;;
    nihongo)
        echo -e "${BLUE}Deploying Nihongo Quest App...${NC}"
        deploy_project "Nihongo Quest App" "/Users/m1876041/Documents/Github/NihonSelfPace/nihongo-quest-app/frontend"
        ;;
    both)
        echo -e "${BLUE}Deploying both projects...${NC}"
        deploy_project "Nihon Quest Fullstack" "/Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend"
        deploy_project "Nihongo Quest App" "/Users/m1876041/Documents/Github/NihonSelfPace/nihongo-quest-app/frontend"
        ;;
    *)
        echo -e "${RED}❌ Invalid project: $PROJECT${NC}"
        echo "Usage: ./deploy-vercel.sh [fullstack|nihongo|both]"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo -e "${BLUE}View your deployments:${NC} https://vercel.com/dashboard"
