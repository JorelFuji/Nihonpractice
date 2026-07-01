#!/usr/bin/env bash
# local-ci.sh — run everything CI will run, BEFORE you push.
# Make executable:  chmod +x local-ci.sh
# Run:              ./local-ci.sh
#
# Exits non-zero on the first failure, so you catch the exact failing step
# in seconds instead of waiting on a remote pipeline.

set -euo pipefail

step() { printf "\n\033[1;34m==> %s\033[0m\n" "$1"; }

# 1) Validate the pipeline definition itself (cheapest check).
step "1/4  Validating pipeline YAML"
if command -v glab >/dev/null 2>&1; then
  glab ci lint || { echo "❌ .gitlab-ci.yml is invalid"; exit 1; }
else
  echo "  (skip: install 'glab' via brew install glab)"
fi

# 2) Run pre-commit hooks against all files (format, yaml, secrets).
step "2/4  Running pre-commit hooks"
if command -v pre-commit >/dev/null 2>&1; then
  pre-commit run --all-files
else
  echo "  (skip: pip install pre-commit)"
fi

# 3) Run the real build/test/scan via the SAME make targets CI uses.
step "3/4  Running make ci (lint + test + scan)"
make ci

# 4) OPTIONAL: run the actual pipeline jobs in Docker for full fidelity.
step "4/4  Pipeline job dry-run (optional)"
if command -v gitlab-ci-local >/dev/null 2>&1; then
  gitlab-ci-local || { echo "❌ a pipeline job failed locally"; exit 1; }
else
  echo "  (skip: 'npm i -g gitlab-ci-local' for full pipeline simulation)"
fi

printf "\n\033[1;32m✅ All local checks passed — safe to push.\033[0m\n"
