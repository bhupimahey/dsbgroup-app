#!/bin/sh
# Apply Prisma migrations. If production was previously synced via db push,
# recover by marking the sync migration as applied when columns already exist.
set -euo pipefail

npm ci --ignore-scripts

if OUTPUT="$(npx prisma migrate deploy 2>&1)"; then
  echo "$OUTPUT"
  exit 0
fi

echo "$OUTPUT"

if echo "$OUTPUT" | grep -qE "Duplicate column name|1060|sync_schema_fields|P3018"; then
  echo "==> Recovering: schema columns already exist, marking migration applied"
  npx prisma migrate resolve --applied 20260702173000_sync_schema_fields
  npx prisma migrate deploy
  exit 0
fi

exit 1
