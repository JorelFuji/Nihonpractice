# Nihon Quest - Development Makefile
# Quick access to all development tools

.PHONY: help install dev build lint deploy health test clean

# Default target
help:
	@echo "🎌 Nihon Quest - Development Commands"
	@echo "======================================"
	@echo ""
	@echo "Development:"
	@echo "  make install     - Install all dependencies"
	@echo "  make dev         - Start development server"
	@echo "  make build       - Build for production"
	@echo "  make preview     - Preview production build"
	@echo ""
	@echo "Quality:"
	@echo "  make lint        - Run linter"
	@echo "  make lint-fix    - Fix linting errors"
	@echo "  make format      - Format code"
	@echo "  make type-check  - TypeScript type checking"
	@echo ""
	@echo "Deployment:"
	@echo "  make deploy      - Full deployment (lint + build + deploy)"
	@echo "  make deploy-fast - Quick deployment (hosting only)"
	@echo "  make deploy-func - Deploy functions only"
	@echo ""
	@echo "Monitoring:"
	@echo "  make health      - Run health check"
	@echo "  make logs        - View Firebase logs"
	@echo "  make status      - Check deployment status"
	@echo ""
	@echo "Testing:"
	@echo "  make test        - Run tests"
	@echo "  make emulators   - Start Firebase emulators"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean       - Clean build artifacts"
	@echo "  make update      - Update dependencies"
	@echo ""

# Install dependencies
install:
	@echo "📦 Installing frontend dependencies..."
	cd frontend && npm install
	@echo "📦 Installing functions dependencies..."
	cd functions && npm install
	@echo "✅ Installation complete!"

# Development
dev:
	@echo "🚀 Starting development server..."
	cd frontend && npm run dev

build:
	@echo "🔨 Building for production..."
	cd frontend && npm run build

preview:
	@echo "👀 Previewing production build..."
	cd frontend && npm run preview

# Quality checks
lint:
	@echo "🔍 Running linter..."
	cd frontend && npm run lint

lint-fix:
	@echo "🔧 Fixing linting errors..."
	cd frontend && npm run lint:fix

format:
	@echo "✨ Formatting code..."
	cd frontend && npm run format

format-check:
	@echo "🔍 Checking code formatting..."
	cd frontend && npm run format:check

type-check:
	@echo "📝 Type checking..."
	cd frontend && npm run type-check

# Deployment
deploy: lint type-check build
	@echo "🚀 Deploying to Firebase..."
	cd frontend && firebase deploy
	@echo "✅ Deployment complete!"
	@make health

deploy-fast:
	@echo "⚡ Quick deployment (hosting only)..."
	cd frontend && npm run deploy:hosting
	@echo "✅ Deployment complete!"

deploy-func:
	@echo "⚡ Deploying functions..."
	cd frontend && npm run deploy:functions
	@echo "✅ Functions deployed!"

# Monitoring
health:
	@echo "🏥 Running health check..."
	cd frontend && npm run health-check

logs:
	@echo "📋 Viewing Firebase logs..."
	firebase functions:log

logs-follow:
	@echo "📋 Streaming Firebase logs..."
	firebase functions:log --follow

status:
	@echo "📊 Checking deployment status..."
	@firebase projects:list
	@echo ""
	@echo "🌐 Production URL: https://nihonselfpacepractic.web.app"

# Testing
test:
	@echo "🧪 Running tests..."
	cd frontend && npm test

emulators:
	@echo "🔧 Starting Firebase emulators..."
	firebase emulators:start

emulators-functions:
	@echo "🔧 Starting Functions emulator..."
	firebase emulators:start --only functions

# Maintenance
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf frontend/dist
	rm -rf frontend/node_modules/.vite
	@echo "✅ Clean complete!"

clean-all:
	@echo "🧹 Deep cleaning..."
	rm -rf frontend/dist
	rm -rf frontend/node_modules
	rm -rf functions/node_modules
	@echo "✅ Deep clean complete! Run 'make install' to reinstall."

update:
	@echo "📦 Updating dependencies..."
	cd frontend && npm update
	cd functions && npm update
	@echo "✅ Update complete!"

# Git operations
git-status:
	@echo "📊 Git status..."
	@git status

git-push:
	@echo "📤 Pushing to remote..."
	@git push

# Combined workflows
check: lint type-check
	@echo "✅ All checks passed!"

full-deploy: check build deploy health
	@echo "✅ Full deployment complete!"

quick-start: install dev
	@echo "✅ Ready to develop!"

# Docker commands
docker-build:
	@echo "🐳 Building Docker image..."
	docker build -t nihon-quest:latest -f Dockerfile .

docker-run:
	@echo "🐳 Running Docker container..."
	docker run -d -p 8080:80 --name nihon-quest nihon-quest:latest

docker-stop:
	@echo "🐳 Stopping Docker container..."
	docker stop nihon-quest || true
	docker rm nihon-quest || true

docker-push:
	@echo "🐳 Pushing Docker image..."
	docker tag nihon-quest:latest ghcr.io/jorelfuji/nihonpractice:latest
	docker push ghcr.io/jorelfuji/nihonpractice:latest

docker-logs:
	@echo "🐳 Viewing Docker logs..."
	docker logs -f nihon-quest

# Kubernetes commands
k8s-deploy:
	@echo "☸️  Deploying to Kubernetes..."
	kubectl apply -f ../k8s/

k8s-status:
	@echo "☸️  Checking Kubernetes status..."
	kubectl get all -n nihon-quest

k8s-logs:
	@echo "☸️  Viewing Kubernetes logs..."
	kubectl logs -f deployment/nihon-quest -n nihon-quest

k8s-delete:
	@echo "☸️  Deleting Kubernetes deployment..."
	kubectl delete -f ../k8s/

k8s-scale:
	@echo "☸️  Scaling deployment..."
	kubectl scale deployment nihon-quest --replicas=5 -n nihon-quest

# Helm commands
helm-install:
	@echo "⎈ Installing Helm chart..."
	helm install nihon-quest ../helm/nihon-quest -n nihon-quest --create-namespace

helm-upgrade:
	@echo "⎈ Upgrading Helm release..."
	helm upgrade nihon-quest ../helm/nihon-quest -n nihon-quest

helm-rollback:
	@echo "⎈ Rolling back Helm release..."
	helm rollback nihon-quest 1 -n nihon-quest

helm-uninstall:
	@echo "⎈ Uninstalling Helm release..."
	helm uninstall nihon-quest -n nihon-quest

helm-list:
	@echo "⎈ Listing Helm releases..."
	helm list -n nihon-quest

# Terraform commands
tf-init:
	@echo "🏗️  Initializing Terraform..."
	cd ../terraform && terraform init

tf-plan:
	@echo "🏗️  Planning Terraform changes..."
	cd ../terraform && terraform plan

tf-apply:
	@echo "🏗️  Applying Terraform changes..."
	cd ../terraform && terraform apply

tf-destroy:
	@echo "🏗️  Destroying Terraform infrastructure..."
	cd ../terraform && terraform destroy

tf-show:
	@echo "🏗️  Showing Terraform state..."
	cd ../terraform && terraform show

# OpenTofu commands (Terraform alternative)
tofu-init:
	@echo "🏗️  Initializing OpenTofu..."
	cd ../terraform && tofu init

tofu-plan:
	@echo "🏗️  Planning OpenTofu changes..."
	cd ../terraform && tofu plan

tofu-apply:
	@echo "🏗️  Applying OpenTofu changes..."
	cd ../terraform && tofu apply
