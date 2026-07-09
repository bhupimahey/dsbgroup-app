#!/usr/bin/env bash
# Run on the VPS (manually or via GitHub Actions SSH) to update the live site.
# Uses git pull — prefer deploy/rsync-to-vps.sh for rsync-based deploys.
# Never creates, copies, or overwrites the server .env — production secrets stay on the VPS.
set -euo pipefail

APP_DIR="${VPS_APP_DIR:-/var/www/checkmockup}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"

cd "$APP_DIR"

if [[ ! -f .env ]]; then
  echo "ERROR: .env not found in $APP_DIR."
  echo "Create it once on the server (cp .env.example .env and edit). Deploy will not generate it."
  exit 1
fi

if git ls-files --error-unmatch .env >/dev/null 2>&1; then
  echo "ERROR: .env is tracked in git — aborting to protect production secrets."
  exit 1
fi

if [[ "${SKIP_GIT_PULL:-}" != "1" ]]; then
  ENV_BACKUP="$(mktemp)"
  cp .env "$ENV_BACKUP"
  echo "==> Backed up production .env (will restore after code update)"

  echo "==> Pulling latest code from main"
  git fetch origin main
  git reset --hard origin/main

  cp "$ENV_BACKUP" .env
  rm -f "$ENV_BACKUP"
  echo "==> Restored production .env (unchanged)"
fi

chmod +x deploy/vps-remote-build.sh deploy/migrate.sh
VPS_APP_DIR="$APP_DIR" COMPOSE_FILE="$COMPOSE_FILE" bash deploy/vps-remote-build.sh
