#!/bin/bash

set -e

echo "🌸 Nihon Quest - Quick Start Setup 🌸"
echo "======================================"
echo ""

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker Desktop."
    echo "   Download: https://www.docker.com/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose not found. Please install Docker Compose."
    exit 1
fi

echo "✓ Docker found"
echo "✓ Docker Compose found"
echo ""

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  IMPORTANT: Please add your OpenAI API key to the .env file"
    echo "   Edit .env and set: OPENAI_API_KEY=sk-your-key-here"
    echo ""
    read -p "Press Enter when you've added your API key (or to skip for now)..."
fi

# Start services
echo ""
echo "Starting services with Docker Compose..."
docker-compose up -d

echo ""
echo "Waiting for services to be ready..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "✨ Success! Services are running."
    echo ""
    echo "Access your app:"
    echo "  Frontend:  http://localhost:3000"
    echo "  Backend:   http://localhost:8000"
    echo "  API Docs:  http://localhost:8000/docs"
    echo ""
    echo "Next steps:"
    echo "  1. Visit http://localhost:3000 to use the app"
    echo "  2. Go to AI Tutor page and ask a grammar question"
    echo "  3. Check out the Practice page for SRS reviews"
    echo ""
    echo "To download dictionary data (optional but recommended):"
    echo "  cd data && ./download_data.sh"
    echo "  docker-compose exec backend python scripts/import_dictionary.py"
    echo ""
    echo "To stop services:"
    echo "  docker-compose down"
    echo ""
    echo "To view logs:"
    echo "  docker-compose logs -f"
    echo ""
else
    echo "❌ Some services failed to start. Check logs with:"
    echo "   docker-compose logs"
    exit 1
fi
