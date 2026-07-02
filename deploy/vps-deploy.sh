#!/usr/bin/env bash
# Run on the VPS (manually or via GitHub Actions SSH) to update the live site.
set -euo pipefail

APP_DIR="${VPS_APP_DIR:-/var/www/checkmockup}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"

cd "$APP_DIR"

echo "==> Pulling latest code from main"
git fetch origin main
git reset --hard origin/main

echo "==> Rebuilding and restarting containers"
docker compose -f "$COMPOSE_FILE" up -d --build

echo "==> Applying database migrations"
NETWORK="$(
  docker compose -f "$COMPOSE_FILE" ps -q mysql 2>/dev/null \
    | head -1 \
    | xargs -r docker inspect -f '{{range $k, $v := .NetworkSettings.Networks}}{{$k}}{{end}}'
)"

if [[ -z "$NETWORK" ]]; then
  echo "Could not detect Docker network; skipping migrations."
  exit 1
fi

docker run --rm \
  -v "$APP_DIR:/app" \
  -w /app \
  --env-file "$APP_DIR/.env" \
  --network "$NETWORK" \
  node:20-alpine sh -c "npm ci && npx prisma migrate deploy"

echo "==> Deploy complete"
