#!/usr/bin/env bash
# Dev Inner Loop: Instant feedback while coding
# Run this in a terminal while you work - it gives instant feedback on save
#
# The Pyramid (you're at the bottom - fastest feedback):
#   1. Dev inner loop ← YOU ARE HERE (instant: watch mode)
#   2. Pre-commit hook (fast: lint + secrets on staged)
#   3. Pre-push hook (full: lint + test + scan + build)
#   4. CI (thin confirmation)
#   5. Scheduled deep scans (weekly)

set -e

echo ""
echo "╔════════════════════════════════════════════════╗"
echo "║  🔄 DEV INNER LOOP: Instant Feedback Mode      ║"
echo "║  Changes auto-rebuild and tests auto-rerun     ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Detect which project to run
if [ -n "$1" ]; then
    PROJECT="$1"
else
    echo "📦 Which project?"
    echo ""
    echo "  1. fullstack   - nihon-quest-fullstack/frontend"
    echo "  2. nihongo     - nihongo-quest-app/frontend"
    echo "  3. flutter     - nihon_quest_mobile"
    echo ""
    read -p "Choose (1-3): " choice
    
    case $choice in
        1) PROJECT="fullstack" ;;
        2) PROJECT="nihongo" ;;
        3) PROJECT="flutter" ;;
        *) echo "Invalid choice"; exit 1 ;;
    esac
fi

echo ""
echo "🚀 Starting dev loop for: $PROJECT"
echo ""

case $PROJECT in
    fullstack)
        echo "📂 Working directory: nihon-quest-fullstack/frontend"
        echo "🔥 Vite dev server: http://localhost:5173"
        echo "🧪 Tests: Watch mode (re-runs on file change)"
        echo ""
        echo "Press Ctrl+C to stop"
        echo ""
        sleep 2
        
        cd nihon-quest-fullstack/frontend
        
        # Open two terminals (or use tmux if available)
        if command -v tmux >/dev/null 2>&1; then
            # Use tmux for split-pane experience
            tmux new-session -d -s dev-fullstack
            tmux split-window -h -t dev-fullstack
            tmux send-keys -t dev-fullstack:0.0 'cd nihon-quest-fullstack/frontend && npm run dev' C-m
            tmux send-keys -t dev-fullstack:0.1 'cd nihon-quest-fullstack/frontend && npm test -- --watch' C-m
            tmux attach-session -t dev-fullstack
        else
            # Fallback: just run dev server
            echo "💡 Tip: Install tmux for split-pane dev experience"
            echo "   brew install tmux"
            echo ""
            npm run dev
        fi
        ;;
        
    nihongo)
        echo "📂 Working directory: nihongo-quest-app/frontend"
        echo "🔥 Vite dev server: http://localhost:5173"
        echo "🧪 Tests: Watch mode (re-runs on file change)"
        echo ""
        echo "Press Ctrl+C to stop"
        echo ""
        sleep 2
        
        cd nihongo-quest-app/frontend
        
        if command -v tmux >/dev/null 2>&1; then
            tmux new-session -d -s dev-nihongo
            tmux split-window -h -t dev-nihongo
            tmux send-keys -t dev-nihongo:0.0 'cd nihongo-quest-app/frontend && npm run dev' C-m
            tmux send-keys -t dev-nihongo:0.1 'cd nihongo-quest-app/frontend && npm test -- --watch' C-m
            tmux attach-session -t dev-nihongo
        else
            npm run dev
        fi
        ;;
        
    flutter)
        echo "📂 Working directory: nihon_quest_mobile"
        echo "🔥 Flutter web: http://localhost:8080"
        echo ""
        echo "Press Ctrl+C to stop"
        echo ""
        sleep 2
        
        cd nihon_quest_mobile
        flutter run -d chrome --web-port 8080
        ;;
        
    *)
        echo "❌ Unknown project: $PROJECT"
        exit 1
        ;;
esac
