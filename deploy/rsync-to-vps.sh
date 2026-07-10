#!/usr/bin/env bash
# Sync project to the VPS with rsync, then rebuild Docker on the server.
# Usage (from repo root, Git Bash / WSL / macOS / Linux):
#   export VPS_HOST=66.116.239.195
#   export VPS_USER=root
#   export VPS_APP_DIR=/var/www/checkmockup
#   export VPS_SSH_KEY=~/.ssh/dsbgroup_deploy   # optional
#   bash deploy/rsync-to-vps.sh
#
# Or load deploy/rsync.env (copy from deploy/rsync.env.example).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

if [[ -f "$SCRIPT_DIR/rsync.env" ]]; then
  # shellcheck disable=SC1091
  set -a
  source "$SCRIPT_DIR/rsync.env"
  set +a
fi

VPS_HOST="${VPS_HOST:?Set VPS_HOST (or create deploy/rsync.env)}"
VPS_USER="${VPS_USER:-root}"
VPS_APP_DIR="${VPS_APP_DIR:-/var/www/checkmockup}"
VPS_SSH_PORT="${VPS_SSH_PORT:-22}"
VPS_SSH_KEY="${VPS_SSH_KEY:-}"

if ! command -v rsync >/dev/null 2>&1; then
  echo "ERROR: rsync not found. Install it or use Git Bash / WSL on Windows."
  exit 1
fi

SSH_BASE=(ssh -p "$VPS_SSH_PORT" -o StrictHostKeyChecking=accept-new)
if [[ -n "$VPS_SSH_KEY" ]]; then
  SSH_BASE+=(-i "$VPS_SSH_KEY")
fi

RSYNC_RSH="ssh -p ${VPS_SSH_PORT} -o StrictHostKeyChecking=accept-new"
if [[ -n "$VPS_SSH_KEY" ]]; then
  RSYNC_RSH="ssh -p ${VPS_SSH_PORT} -i ${VPS_SSH_KEY} -o StrictHostKeyChecking=accept-new"
fi

REMOTE="${VPS_USER}@${VPS_HOST}"

echo "==> Ensuring app directory exists on VPS"
"${SSH_BASE[@]}" "$REMOTE" "mkdir -p '$VPS_APP_DIR'"

echo "==> Rsyncing $ROOT_DIR → $REMOTE:$VPS_APP_DIR"
rsync -avz --delete \
  --exclude-from="$SCRIPT_DIR/rsync-excludes.txt" \
  -e "$RSYNC_RSH" \
  "$ROOT_DIR/" \
  "$REMOTE:$VPS_APP_DIR/"

echo "==> Running remote Docker build and migrations"
"${SSH_BASE[@]}" "$REMOTE" "cd '$VPS_APP_DIR' && chmod +x deploy/vps-remote-build.sh deploy/migrate.sh && VPS_APP_DIR='$VPS_APP_DIR' bash deploy/vps-remote-build.sh"

echo "==> Rsync deploy complete"
