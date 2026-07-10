#!/bin/bash

echo "🚀 Deploying NihongoQuest Flutter App to Firebase..."
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

echo "📦 Step 1: Installing dependencies..."
flutter pub get

if [ $? -ne 0 ]; then
    echo "❌ Error: Flutter pub get failed"
    echo "💡 Make sure Flutter is installed: https://flutter.dev/docs/get-started/install"
    exit 1
fi

echo ""
echo "🔨 Step 2: Building for web (release mode)..."
flutter build web --release

if [ $? -ne 0 ]; then
    echo "❌ Error: Flutter build failed"
    exit 1
fi

echo ""
echo "🔥 Step 3: Deploying to Firebase Hosting..."
firebase deploy --only hosting

if [ $? -ne 0 ]; then
    echo "❌ Error: Firebase deploy failed"
    echo "💡 Make sure you're logged in: firebase login"
    exit 1
fi

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "🌐 Your app is live at:"
echo "   https://nihonselfpacepractic-flutter.web.app/"
echo ""
echo "📝 Remember to hard refresh your browser:"
echo "   Mac: Cmd + Shift + R"
echo "   Windows/Linux: Ctrl + Shift + R"
echo ""
echo "🎉 Happy testing!"
