#!/bin/bash
# setup-okta-admin.sh - Setup Okta Application Configuration

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}🔑 Okta CLI Application Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if okta CLI is installed
if ! command -v okta &> /dev/null; then
    echo -e "${RED}✗ Okta CLI not found!${NC} Please install it or make sure it is in your PATH."
    exit 1
fi

echo -e "${GREEN}✓ Okta CLI is installed!${NC}"
echo -e "${YELLOW}Starting Okta App Creation wizard...${NC}"
echo "We are going to create a Single Page App (SPA) config for your React app."
echo ""
echo -e "${BLUE}Interactive Setup Instructions:${NC}"
echo "1. Choose type: Single Page Application (SPA)"
echo "2. Redirect URI: http://localhost:5173/login/callback"
echo "3. Post-Logout Redirect URI: http://localhost:5173"
echo ""
read -p "Press Enter to start 'okta apps create'..."

# Run okta apps create
okta apps create

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${YELLOW}Configuring Local React Environment (.env)${NC}"
echo -e "${BLUE}========================================${NC}"
echo "Please enter the Client ID and Issuer URL from the output above:"
echo ""

read -p "Enter Client ID: " OKTA_CLIENT_ID
read -p "Enter Issuer URL (e.g. https://dev-xxxx.okta.com/oauth2/default): " OKTA_ISSUER

ENV_FILE="/Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend/.env"

# Create/Append to .env
echo "" >> "$ENV_FILE"
echo "# Okta Auth Configuration" >> "$ENV_FILE"
echo "VITE_OKTA_CLIENT_ID=\"$OKTA_CLIENT_ID\"" >> "$ENV_FILE"
echo "VITE_OKTA_ISSUER=\"$OKTA_ISSUER\"" >> "$ENV_FILE"
echo "VITE_OKTA_REDIRECT_URI=\"http://localhost:5173/login/callback\"" >> "$ENV_FILE"

echo -e "${GREEN}✓ Environment variables successfully written to: ${ENV_FILE}${NC}"
echo ""
echo -e "${GREEN}🎉 Okta CLI setup complete! You can now start local testing.${NC}"
