#!/bin/bash
# ===============================================
# NIHONQUEST - Game Organization Script
# ===============================================
# This script organizes all existing games into
# a unified structure for Firebase deployment
# ===============================================

set -e  # Exit on error

# Colors
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}🎮 NihonQuest Game Organization${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Base directories
BASE_DIR="/Users/m1876041/Documents/Github/NihonSelfPace"
SOURCE_GAMES="/Users/m1876041/Documents/Github/Shiritori_othello_game/stitch_bilingual_shiritori_master"
FIREBASE_DIR="$BASE_DIR/firebase-hosting"
GAMES_DIR="$FIREBASE_DIR/public/games"
MENU_DIR="$FIREBASE_DIR/public/menu"

# Create directory structure
echo -e "${YELLOW}Step 1: Creating directory structure...${NC}"
mkdir -p "$GAMES_DIR"/{othello,shiritori,kawaii-logic,battle-arena,pet-spirit,shared}
mkdir -p "$MENU_DIR"
mkdir -p "$FIREBASE_DIR"
echo -e "${GREEN}✓ Directories created${NC}"

# Copy Othello game
echo ""
echo -e "${YELLOW}Step 2: Copying Othello game...${NC}"
if [ -d "$SOURCE_GAMES/othello_game_board" ]; then
    cp -r "$SOURCE_GAMES/othello_game_board"/* "$GAMES_DIR/othello/"
    # Rename code.html to index.html
    if [ -f "$GAMES_DIR/othello/code.html" ]; then
        mv "$GAMES_DIR/othello/code.html" "$GAMES_DIR/othello/index.html"
    fi
    echo -e "${GREEN}✓ Othello copied${NC}"
else
    echo -e "${RED}✗ Othello source not found${NC}"
fi

# Copy Shiritori game
echo ""
echo -e "${YELLOW}Step 3: Copying Shiritori game...${NC}"
if [ -d "$SOURCE_GAMES/shiritori_battle_arena_3d" ]; then
    cp -r "$SOURCE_GAMES/shiritori_battle_arena_3d"/* "$GAMES_DIR/shiritori/"
    if [ -f "$GAMES_DIR/shiritori/code.html" ]; then
        mv "$GAMES_DIR/shiritori/code.html" "$GAMES_DIR/shiritori/index.html"
    fi
    echo -e "${GREEN}✓ Shiritori copied${NC}"
else
    echo -e "${RED}✗ Shiritori source not found${NC}"
fi

# Copy Kawaii Logic
echo ""
echo -e "${YELLOW}Step 4: Copying Kawaii Logic game...${NC}"
if [ -d "$SOURCE_GAMES/kawaii_logic_workspace" ]; then
    cp -r "$SOURCE_GAMES/kawaii_logic_workspace"/* "$GAMES_DIR/kawaii-logic/"
    if [ -f "$GAMES_DIR/kawaii-logic/code.html" ]; then
        mv "$GAMES_DIR/kawaii-logic/code.html" "$GAMES_DIR/kawaii-logic/index.html"
    fi
    echo -e "${GREEN}✓ Kawaii Logic copied${NC}"
else
    echo -e "${RED}✗ Kawaii Logic source not found${NC}"
fi

# Copy Battle Arena
echo ""
echo -e "${YELLOW}Step 5: Copying Battle Arena game...${NC}"
if [ -d "$SOURCE_GAMES/kawaii_battle_arena_new_theme" ]; then
    cp -r "$SOURCE_GAMES/kawaii_battle_arena_new_theme"/* "$GAMES_DIR/battle-arena/"
    if [ -f "$GAMES_DIR/battle-arena/code.html" ]; then
        mv "$GAMES_DIR/battle-arena/code.html" "$GAMES_DIR/battle-arena/index.html"
    fi
    echo -e "${GREEN}✓ Battle Arena copied${NC}"
else
    echo -e "${RED}✗ Battle Arena source not found${NC}"
fi

# Copy Game Selection Menu
echo ""
echo -e "${YELLOW}Step 6: Copying Game Selection Menu...${NC}"
if [ -d "$SOURCE_GAMES/kawaii_game_selection_unified" ]; then
    cp -r "$SOURCE_GAMES/kawaii_game_selection_unified"/* "$MENU_DIR/"
    if [ -f "$MENU_DIR/code.html" ]; then
        mv "$MENU_DIR/code.html" "$MENU_DIR/index.html"
    fi
    echo -e "${GREEN}✓ Menu copied${NC}"
else
    echo -e "${RED}✗ Menu source not found${NC}"
fi

# Copy shared assets (if any)
echo ""
echo -e "${YELLOW}Step 7: Copying shared assets...${NC}"
if [ -d "$SOURCE_GAMES/three.js" ]; then
    cp -r "$SOURCE_GAMES/three.js"/* "$GAMES_DIR/shared/"
    echo -e "${GREEN}✓ Shared assets copied${NC}"
else
    echo -e "${YELLOW}⚠ No shared assets found${NC}"
fi

# Create Pet Spirit placeholder
echo ""
echo -e "${YELLOW}Step 8: Creating Pet Spirit placeholder...${NC}"
cat > "$GAMES_DIR/pet-spirit/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pet Spirit - Coming Soon</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-purple-600 to-blue-600 min-h-screen flex items-center justify-center">
    <div class="text-center text-white">
        <div class="text-9xl mb-8">🐱💫</div>
        <h1 class="text-6xl font-bold mb-4">Pet Spirit</h1>
        <p class="text-2xl mb-8">Coming Soon!</p>
        <a href="/menu" class="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-xl hover:scale-110 transition-all inline-block">
            ← Back to Menu
        </a>
    </div>
</body>
</html>
EOF
echo -e "${GREEN}✓ Pet Spirit placeholder created${NC}"

# Create firebase.json
echo ""
echo -e "${YELLOW}Step 9: Creating Firebase configuration...${NC}"
cat > "$FIREBASE_DIR/firebase.json" << 'EOF'
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
EOF
echo -e "${GREEN}✓ Firebase config created${NC}"

# Create .firebaserc
echo ""
echo -e "${YELLOW}Step 10: Creating Firebase RC file...${NC}"
cat > "$FIREBASE_DIR/.firebaserc" << 'EOF'
{
  "projects": {
    "default": "nihonselfpacepractic"
  }
}
EOF
echo -e "${GREEN}✓ Firebase RC file created${NC}"

# Summary
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ ORGANIZATION COMPLETE!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}📁 Games organized in:${NC}"
echo -e "   $GAMES_DIR"
echo ""
echo -e "${BLUE}🎮 Games ready:${NC}"
echo -e "   ✓ Othello"
echo -e "   ✓ Shiritori"
echo -e "   ✓ Kawaii Logic"
echo -e "   ✓ Battle Arena"
echo -e "   ✓ Pet Spirit (placeholder)"
echo ""
echo -e "${BLUE}📋 Menu ready:${NC}"
echo -e "   ✓ Game Selection Menu"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "   1. Review games in: $FIREBASE_DIR"
echo -e "   2. Deploy with: cd $FIREBASE_DIR && firebase deploy"
echo -e "   3. Test at: https://nihonselfpacepractic.web.app/menu"
echo ""
echo -e "${GREEN}Happy gaming! 🎉${NC}"
