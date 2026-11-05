#!/usr/bin/env bash
#
# Deploy Deck Loader on the VPS.
#
#   ./deploy/deploy.sh
#   WEB_ROOT=/var/www/presentations ./deploy/deploy.sh
#
# Pulls, installs from the lockfile, builds, then mirrors dist/ into the web
# root. Playwright is never run here: PDFs are committed from the author's
# machine, so the server has no browser to install.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
WEB_ROOT="${WEB_ROOT:-/var/www/presentations}"

say() { printf '\n==> %s\n' "$*"; }

say "Repository: ${APP_DIR}"
cd "${APP_DIR}"

if [ ! -d .git ]; then
  printf 'error: %s is not a git checkout\n' "${APP_DIR}" >&2
  exit 1
fi

say "Pulling latest changes"
git pull --ff-only

say "Installing dependencies from bun.lock"
bun install --frozen-lockfile

say "Building into dist/"
bun run build

if [ ! -d dist ]; then
  printf 'error: build produced no dist/ directory\n' >&2
  exit 1
fi

say "Syncing dist/ -> ${WEB_ROOT}"
mkdir -p "${WEB_ROOT}"
rsync -a --delete "${APP_DIR}/dist/" "${WEB_ROOT}/"

say "Done. $(find "${WEB_ROOT}" -type f | wc -l | tr -d ' ') files in ${WEB_ROOT}."
