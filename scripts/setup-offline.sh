#!/usr/bin/env bash

# Install pnpm and install workspace dependencies with optional offline support.
# Usage:
#   scripts/setup-offline.sh [--download-only]
#
# When called with --download-only, the script runs 'pnpm fetch' for each
# workspace so dependencies can be pre-fetched on a machine with internet
# access. Without the flag, it installs the packages using the previously
# downloaded artifacts (with --offline).

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

DOWNLOAD_ONLY=0
for arg in "$@"; do
  case "$arg" in
    --download-only)
      DOWNLOAD_ONLY=1
      ;;
    *)
      echo "Unknown option: $arg" >&2
      exit 1
      ;;
  esac
done

# Ensure pnpm is available via corepack
if ! command -v pnpm >/dev/null 2>&1; then
  if command -v corepack >/dev/null 2>&1; then
    corepack enable >/dev/null
    corepack prepare pnpm@10.8.1 --activate >/dev/null
  else
    echo "pnpm not found and corepack is unavailable. Please install pnpm." >&2
    exit 1
  fi
fi

CMD="install"
ARGS=(--offline)
if [[ "$DOWNLOAD_ONLY" -eq 1 ]]; then
  CMD="fetch"
  ARGS=()
fi

# Run the command in the repo root first
pnpm "$CMD" "${ARGS[@]}"

# Extract workspace directories from pnpm-workspace.yaml
mapfile -t WORKSPACES < <(grep '^  - ' pnpm-workspace.yaml | sed 's/^  - //')

for pattern in "${WORKSPACES[@]}"; do
  for dir in $pattern; do
    if [[ -d "$dir" ]]; then
      echo "Running pnpm $CMD in $dir"
      (cd "$dir" && pnpm "$CMD" "${ARGS[@]}")
    fi
  done
done

