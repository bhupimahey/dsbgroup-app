#!/usr/bin/env bash
# Run on the VPS after code is updated (rsync or git pull).
# Rebuilds containers and applies migrations. Never touches .env.
set -euo pipefail

APP_DIR="${VPS_APP_DIR:-$(pwd)}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"

cd "$APP_DIR"

if [[ ! -f .env ]]; then
  echo "ERROR: .env not found in $APP_DIR."
  echo "Create it once on the server (cp .env.example .env and edit). Deploy will not generate it."
  exit 1
fi

if command -v git >/dev/null 2>&1 && git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  if git ls-files --error-unmatch .env >/dev/null 2>&1; then
    echo "ERROR: .env is tracked in git — aborting to protect production secrets."
    exit 1
  fi
fi

echo "==> Rebuilding and restarting containers (${WEB_REPLICAS:-3} web replicas)"
WEB_REPLICAS="${WEB_REPLICAS:-3}"
docker compose -f "$COMPOSE_FILE" up -d --build --scale "web=${WEB_REPLICAS}"

echo "==> Reloading nginx upstream (avoids stale web container IP)"
docker compose -f "$COMPOSE_FILE" restart nginx

echo "==> Applying database migrations"
docker compose -f "$COMPOSE_FILE" --profile tools run --rm migrate

echo "==> Remote build complete (.env untouched)"
