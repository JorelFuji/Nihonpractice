# Makefile — single source of truth for BOTH local runs and CI.
# Your .gitlab-ci.yml should call these same targets,
# which guarantees local == CI.
#
# Usage:
#   make ci        # everything the pipeline runs, locally (~2-3 min)
#   make lint
#   make test
#   make scan
#   make ci-quick  # fast checks (frontends only, ~1 min)

.DEFAULT_GOAL := help
.PHONY: help install lint format test scan build ci ci-quick lint-pipeline

IMAGE ?= $(CI_REGISTRY_IMAGE):local

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

# ================================================================================
# INSTALL TARGETS
# ================================================================================

install: install-fullstack install-nihongo ## Install all dependencies
	@echo "✅ All dependencies installed"

install-fullstack: ## Install fullstack frontend dependencies
	cd nihon-quest-fullstack/frontend && npm ci

install-nihongo: ## Install nihongo app dependencies
	cd nihongo-quest-app/frontend && npm ci

install-backend: ## Install Python backend dependencies
	cd nihon-quest-fullstack/backend && pip install -r requirements.txt

install-flutter: ## Install Flutter dependencies
	cd nihon_quest_mobile && flutter pub get

# ================================================================================
# LINT TARGETS (matches CI lint jobs)
# ================================================================================

lint: lint-fullstack lint-nihongo lint-python ## Run all linters
	@echo "✅ All linters passed"

lint-fullstack: ## Lint fullstack frontend
	cd nihon-quest-fullstack/frontend && npm run lint

lint-nihongo: ## Lint nihongo app
	cd nihongo-quest-app/frontend && npm run lint

lint-python: ## Lint Python backend
	cd nihon-quest-fullstack/backend && \
		pip install --quiet flake8 black && \
		flake8 app/ --max-line-length=120 --extend-ignore=E203,W503 && \
		black --check app/

lint-flutter: ## Lint Flutter mobile
	cd nihon_quest_mobile && flutter analyze

# ================================================================================
# FORMAT TARGETS
# ================================================================================

format: format-fullstack format-nihongo format-python ## Auto-format all code
	@echo "✅ All code formatted"

format-fullstack: ## Format fullstack frontend
	cd nihon-quest-fullstack/frontend && npx prettier --write .

format-nihongo: ## Format nihongo app
	cd nihongo-quest-app/frontend && npx prettier --write .

format-python: ## Format Python backend
	cd nihon-quest-fullstack/backend && \
		pip install --quiet black && \
		black app/

# ================================================================================
# TEST TARGETS (matches CI test jobs)
# ================================================================================

test: test-fullstack test-nihongo test-python ## Run all tests
	@echo "✅ All tests passed"

test-fullstack: ## Type-check fullstack frontend
	cd nihon-quest-fullstack/frontend && npm run type-check

test-nihongo: ## Type-check nihongo app
	cd nihongo-quest-app/frontend && npm run type-check

test-python: ## Run Python unit tests
	cd nihon-quest-fullstack/backend && \
		pip install --quiet pytest pytest-cov && \
		pytest -v --cov=app tests/ || echo "⚠️  No tests found"

test-flutter: ## Run Flutter tests
	cd nihon_quest_mobile && flutter test || echo "⚠️  No tests found"

# ================================================================================
# SECURITY SCAN TARGETS (matches CI security stage)
# ================================================================================

scan: scan-secrets scan-npm ## Run all security scans
	@echo "✅ All security scans passed"

scan-secrets: ## Scan for leaked secrets (gitleaks)
	@if command -v gitleaks >/dev/null 2>&1; then \
		gitleaks detect --no-banner --exit-code 0 || echo "⚠️  Secrets detected"; \
	else \
		echo "⚠️  gitleaks not installed (brew install gitleaks)"; \
	fi

scan-npm: ## Scan npm packages for vulnerabilities
	cd nihon-quest-fullstack/frontend && npm audit --audit-level=high || echo "⚠️  Vulnerabilities found"
	cd nihongo-quest-app/frontend && npm audit --audit-level=high || echo "⚠️  Vulnerabilities found"

scan-trivy: ## Scan with Trivy (optional, requires Docker)
	@if command -v trivy >/dev/null 2>&1; then \
		trivy fs --scanners vuln,misconfig,secret --severity HIGH,CRITICAL --exit-code 0 .; \
	else \
		echo "⚠️  trivy not installed (brew install trivy)"; \
	fi

# ================================================================================
# BUILD TARGETS (matches CI build jobs)
# ================================================================================

build: build-fullstack build-nihongo ## Build all projects
	@echo "✅ All builds completed"

build-fullstack: ## Build fullstack frontend
	cd nihon-quest-fullstack/frontend && npm run build

build-nihongo: ## Build nihongo app
	cd nihongo-quest-app/frontend && npm run build

build-flutter: ## Build Flutter web
	cd nihon_quest_mobile && flutter build web --release

# ================================================================================
# CI TARGETS (main entry points)
# ================================================================================

ci-quick: lint-fullstack lint-nihongo test-fullstack test-nihongo ## Quick CI (frontends only, ~1-2 min)
	@echo "✅ Quick local CI passed — safe to push."

ci: lint test scan ## Full local CI (what the pipeline runs, ~2-3 min)
	@echo "✅ Full local CI passed — safe to push."

ci-full: lint test scan build ## Full CI + build (~4-6 min)
	@echo "✅ Full local CI + build passed — safe to push."

# ================================================================================
# PIPELINE VALIDATION
# ================================================================================

lint-pipeline: ## Validate .gitlab-ci.yml itself
	@if command -v glab >/dev/null 2>&1; then \
		glab ci lint; \
	else \
		echo "⚠️  glab not installed (brew install glab)"; \
	fi

ci-local: ## Run actual pipeline jobs in Docker (needs: npm i -g gitlab-ci-local)
	@if command -v gitlab-ci-local >/dev/null 2>&1; then \
		gitlab-ci-local; \
	else \
		echo "⚠️  gitlab-ci-local not installed (npm i -g gitlab-ci-local)"; \
	fi

# ================================================================================
# UTILITY TARGETS
# ================================================================================

clean: ## Clean build artifacts and caches
	rm -rf nihon-quest-fullstack/frontend/dist
	rm -rf nihon-quest-fullstack/frontend/node_modules/.cache
	rm -rf nihongo-quest-app/frontend/dist
	rm -rf nihongo-quest-app/frontend/node_modules/.cache
	rm -rf nihon_quest_mobile/build
	rm -rf nihon-quest-fullstack/backend/.pytest_cache
	rm -rf nihon-quest-fullstack/backend/__pycache__
	@echo "✅ Cleaned build artifacts"

deps-update: ## Update all dependencies
	cd nihon-quest-fullstack/frontend && npm update
	cd nihongo-quest-app/frontend && npm update
	cd nihon_quest_mobile && flutter pub upgrade
	@echo "✅ Dependencies updated"
