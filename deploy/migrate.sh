#!/bin/sh
# Apply Prisma migrations. If production was previously synced via db push,
# recover by marking the sync migration as applied when columns already exist.
set -euo pipefail

npm ci --ignore-scripts

attach_team_photos() {
  echo "==> Attaching team photos by name"
  npx prisma generate
  npx tsx scripts/seed-team-photos.ts || echo "team photo seed skipped"
}

if OUTPUT="$(npx prisma migrate deploy 2>&1)"; then
  echo "$OUTPUT"
  attach_team_photos
  exit 0
fi

echo "$OUTPUT"

if echo "$OUTPUT" | grep -qE "Duplicate column name|1060|sync_schema_fields|P3018"; then
  echo "==> Recovering: schema columns already exist, marking migration applied"
  npx prisma migrate resolve --applied 20260702173000_sync_schema_fields
  npx prisma migrate deploy
  attach_team_photos
  exit 0
fi

exit 1
