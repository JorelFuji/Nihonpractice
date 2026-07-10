#!/bin/bash

# Deploy and Test Script for NihongoQuest Flutter App
# Run from: /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile

echo "🚀 Starting deployment process..."
echo ""

# Navigate to project directory
cd /Users/m1876041/Documents/Github/NihonSelfPace/nihon_quest_mobile

# Step 1: Clean previous build
echo "🧹 Cleaning previous build..."
flutter clean

# Step 2: Get dependencies
echo "📦 Getting dependencies..."
flutter pub get

# Step 3: Build for web
echo "🔨 Building for web (release mode)..."
flutter build web --release

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    
    # Step 4: Deploy to Firebase
    echo "🚀 Deploying to Firebase Hosting..."
    firebase deploy --only hosting:flutter
    
    # Check if deployment was successful
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Deployment successful!"
        echo ""
        echo "🌐 Live URL: https://nihonselfpacepractic-flutter.web.app"
        echo "📊 Console: https://console.firebase.google.com/project/nihonselfpacepractic/hosting"
        echo ""
        echo "🧪 TESTING CHECKLIST:"
        echo "  1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)"
        echo "  2. Check for v2.0.0 badge at bottom-right"
        echo "  3. Verify navigation bar at top"
        echo "  4. Click 'こどもモード' to see games"
        echo "  5. Verify all 6 games are visible"
        echo "  6. Test navigation (back, home, refresh buttons)"
        echo "  7. Try playing a game"
        echo ""
        
        # Open the site for testing
        echo "🌐 Opening live site for testing..."
        open https://nihonselfpacepractic-flutter.web.app
        
        # Open Firebase console
        echo "📊 Opening Firebase console..."
        open https://console.firebase.google.com/project/nihonselfpacepractic/hosting
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "✅ Done!"
