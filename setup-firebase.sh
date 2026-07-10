#!/bin/bash

# 🔥 Firebase Configuration Setup Script
# For NihonSelfPacePractice Project
# Last Updated: June 29, 2026

set -e  # Exit on error

echo "🔥 Firebase Configuration Setup"
echo "================================"
echo ""

PROJECT_ID="nihonselfpacepractic"
FLUTTER_APP="/Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile"
WEB_APP="/Users/m1876041/Documents/Github/NihonSelfPace/nihon-quest-fullstack/frontend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "📋 Project Details:"
echo "   Project ID: ${PROJECT_ID}"
echo "   Project Number: 319096782095"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 1. Check Flutter
echo "1️⃣ Checking Flutter installation..."
if command_exists flutter; then
    echo -e "   ${GREEN}✓${NC} Flutter found: $(flutter --version | head -n 1)"
else
    echo -e "   ${RED}✗${NC} Flutter not found. Please install Flutter first."
    exit 1
fi

# 2. Check Dart
echo ""
echo "2️⃣ Checking Dart installation..."
if command_exists dart; then
    echo -e "   ${GREEN}✓${NC} Dart found: $(dart --version 2>&1 | head -n 1)"
else
    echo -e "   ${RED}✗${NC} Dart not found. Please install Dart first."
    exit 1
fi

# 3. Check FlutterFire CLI
echo ""
echo "3️⃣ Checking FlutterFire CLI..."
if command_exists flutterfire; then
    echo -e "   ${GREEN}✓${NC} FlutterFire CLI found"
else
    echo -e "   ${YELLOW}⚠${NC} FlutterFire CLI not found. Installing..."
    dart pub global activate flutterfire_cli
    echo -e "   ${GREEN}✓${NC} FlutterFire CLI installed"
fi

# 4. Check Firebase CLI
echo ""
echo "4️⃣ Checking Firebase CLI..."
if command_exists firebase; then
    echo -e "   ${GREEN}✓${NC} Firebase CLI found: $(firebase --version)"
else
    echo -e "   ${YELLOW}⚠${NC} Firebase CLI not found. Please install it:"
    echo "      npm install -g firebase-tools"
    exit 1
fi

# 5. Configure Flutter App
echo ""
echo "5️⃣ Configuring Flutter App..."
if [ -d "$FLUTTER_APP" ]; then
    cd "$FLUTTER_APP"
    echo "   📁 Directory: $FLUTTER_APP"
    
    # Check if firebase_options.dart exists
    if [ -f "lib/firebase_options.dart" ]; then
        echo -e "   ${YELLOW}⚠${NC} firebase_options.dart already exists"
        read -p "   Do you want to reconfigure? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo "   🔧 Running flutterfire configure..."
            flutterfire configure --project=$PROJECT_ID
            echo -e "   ${GREEN}✓${NC} Flutter Firebase configured"
        else
            echo "   ⏭️  Skipping Flutter configuration"
        fi
    else
        echo "   🔧 Running flutterfire configure..."
        flutterfire configure --project=$PROJECT_ID
        echo -e "   ${GREEN}✓${NC} Flutter Firebase configured"
    fi
    
    # Install dependencies
    echo "   📦 Installing Flutter dependencies..."
    flutter pub get
    echo -e "   ${GREEN}✓${NC} Dependencies installed"
else
    echo -e "   ${RED}✗${NC} Flutter app directory not found: $FLUTTER_APP"
fi

# 6. Verify Web App Config
echo ""
echo "6️⃣ Verifying Web App Configuration..."
if [ -d "$WEB_APP" ]; then
    CONFIG_FILE="$WEB_APP/src/config/firebaseConfig.ts"
    if [ -f "$CONFIG_FILE" ]; then
        echo -e "   ${GREEN}✓${NC} Web app Firebase config found"
        echo "   📁 Location: $CONFIG_FILE"
        
        # Check if config has correct project ID
        if grep -q "nihonselfpacepractic" "$CONFIG_FILE"; then
            echo -e "   ${GREEN}✓${NC} Project ID is correct"
        else
            echo -e "   ${RED}✗${NC} Project ID mismatch. Please update manually."
        fi
    else
        echo -e "   ${YELLOW}⚠${NC} Web app Firebase config not found"
        echo "   ℹ️  Please create: $CONFIG_FILE"
    fi
else
    echo -e "   ${YELLOW}⚠${NC} Web app directory not found: $WEB_APP"
fi

# 7. Check iOS GoogleService-Info.plist
echo ""
echo "7️⃣ Checking iOS Configuration..."
IOS_PLIST="$FLUTTER_APP/ios/Runner/GoogleService-Info.plist"
if [ -f "$IOS_PLIST" ]; then
    echo -e "   ${GREEN}✓${NC} iOS GoogleService-Info.plist found"
    
    # Check if it has correct project ID
    if grep -q "nihonselfpacepractic" "$IOS_PLIST"; then
        echo -e "   ${GREEN}✓${NC} iOS project ID is correct"
    else
        echo -e "   ${YELLOW}⚠${NC} iOS project ID may need updating"
    fi
else
    echo -e "   ${YELLOW}⚠${NC} iOS GoogleService-Info.plist not found"
    echo "   ℹ️  Download from Firebase Console and place at:"
    echo "      $IOS_PLIST"
fi

# 8. Summary
echo ""
echo "================================"
echo "✅ Setup Complete!"
echo "================================"
echo ""
echo "📊 Summary:"
echo "   ✓ FlutterFire CLI: Ready"
echo "   ✓ Firebase CLI: Ready"
echo "   ✓ Flutter App: $([ -f "$FLUTTER_APP/lib/firebase_options.dart" ] && echo "Configured" || echo "Needs configuration")"
echo "   ✓ Web App: $([ -f "$WEB_APP/src/config/firebaseConfig.ts" ] && echo "Configured" || echo "Needs configuration")"
echo "   ✓ iOS App: $([ -f "$IOS_PLIST" ] && echo "Configured" || echo "Needs GoogleService-Info.plist")"
echo ""
echo "🔗 Useful Links:"
echo "   • Firebase Console: https://console.firebase.google.com/project/${PROJECT_ID}"
echo "   • Web App: https://nihonselfpacepractic.web.app/"
echo "   • Flutter App: https://nihonselfpacepractic-flutter.web.app/"
echo ""
echo "📚 Next Steps:"
echo "   1. Test Flutter app: cd $FLUTTER_APP && flutter run -d chrome"
echo "   2. Test web app: cd $WEB_APP && npm run dev"
echo "   3. Deploy: firebase deploy"
echo ""
echo "📖 Full documentation: /Users/m1876041/Documents/Github/NihonSelfPace/FIREBASE_CONFIG_SETUP.md"
echo ""
