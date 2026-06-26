#!/bin/bash

# NihongoQuest - One-Command Startup Script
# This script checks prerequisites and starts the application

set -e

echo "🌸 Welcome to NihongoQuest Setup! 🌸"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  No .env file found. Creating one...${NC}"
    cat > .env << 'EOF'
OPENAI_API_KEY=sk-your-api-key-here
SECRET_KEY=change-this-secret-key-in-production
EOF
    echo -e "${RED}❌ Please edit .env and add your OpenAI API key!${NC}"
    echo -e "   Get one at: https://platform.openai.com/api-keys"
    echo ""
    exit 1
fi

# Check if OpenAI API key is set
if grep -q "sk-your-api-key-here" .env; then
    echo -e "${RED}❌ Please set your OpenAI API key in .env file!${NC}"
    echo -e "   Get one at: https://platform.openai.com/api-keys"
    echo ""
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed!${NC}"
    echo "   Please install Docker Desktop: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker is not running!${NC}"
    echo "   Please start Docker Desktop"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites met!${NC}"
echo ""

# Start Docker Compose
echo "🚀 Starting NihongoQuest..."
echo ""

docker-compose up -d

echo ""
echo -e "${GREEN}✨ NihongoQuest is starting up! ✨${NC}"
echo ""
echo "Please wait 30-60 seconds for all services to be ready..."
echo ""
echo "Then open your browser to:"
echo -e "${GREEN}  🌐 Frontend:  http://localhost:5173${NC}"
echo -e "  📡 Backend:   http://localhost:8000"
echo -e "  📚 API Docs:  http://localhost:8000/docs"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f"
echo ""
echo "To stop:"
echo "  docker-compose down"
echo ""
echo -e "${YELLOW}がんばってください！(Ganbatte kudasai - Do your best!)${NC}"
