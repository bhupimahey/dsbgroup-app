#!/bin/sh
# Seed demo admin, client user, and CMS sample content on production.
set -euo pipefail

npm ci --ignore-scripts
npx prisma generate
npx prisma db seed
