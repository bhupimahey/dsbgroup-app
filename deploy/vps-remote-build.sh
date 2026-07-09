#!/usr/bin/env bash
# Run on the VPS after code is updated (rsync or git pull).
# Rebuilds containers and applies migrations. Never touches .env.
set -euo pipefail

APP_DIR="${VPS_APP_DIR:-$(pwd)}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
WEB_REPLICAS="${WEB_REPLICAS:-2}"

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

echo "==> Validating nginx config"
docker compose -f "$COMPOSE_FILE" run --rm --no-deps nginx nginx -t

echo "==> Rebuilding and restarting containers (${WEB_REPLICAS} web replicas)"
docker compose -f "$COMPOSE_FILE" up -d --build --scale "web=${WEB_REPLICAS}"

echo "==> Waiting for nginx to accept connections"
for _ in $(seq 1 30); do
  if docker compose -f "$COMPOSE_FILE" exec -T nginx wget -q -O /dev/null http://127.0.0.1/ 2>/dev/null; then
    break
  fi
  sleep 2
done

echo "==> Applying database migrations"
docker compose -f "$COMPOSE_FILE" --profile tools run --rm migrate

echo "==> Container status"
docker compose -f "$COMPOSE_FILE" ps

echo "==> Remote build complete (.env untouched)"
