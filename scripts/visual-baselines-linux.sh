#!/usr/bin/env bash
# Regenerates the Linux visual baselines (the ones CI compares against) inside
# the official Playwright Docker image, from a clean copy of the working tree.
# Review the changed PNGs before committing them. Requires Docker.
set -euo pipefail

cd "$(dirname "$0")/.."

version="$(node -p "require('@playwright/test/package.json').version")"
image="mcr.microsoft.com/playwright:v${version}-noble"
pnpm_version="$(node -p "require('./package.json').packageManager.split('@')[1]")"
snapshots="tests/visual.spec.ts-snapshots"

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

# A copy without node_modules, so Windows or macOS binaries never reach Linux.
tar --exclude=node_modules --exclude=.next --exclude=.git --exclude=reports \
  --exclude=coverage --exclude=.stryker-tmp --exclude=test-results \
  --exclude=playwright-report --exclude="$snapshots/*-linux.png" \
  -cf "$work/project.tar" .

cat >"$work/run.sh" <<EOF
set -euo pipefail
mkdir -p /app && cd /app
tar -xf /work/project.tar
npm install -g pnpm@${pnpm_version} >/dev/null 2>&1
HUSKY=0 pnpm install --frozen-lockfile >/dev/null 2>&1
pnpm test:visual:update
cp ${snapshots}/*-linux.png /out/
EOF

mkdir -p "$snapshots"

# MSYS_NO_PATHCONV keeps Git Bash on Windows from rewriting the container paths.
MSYS_NO_PATHCONV=1 docker run --rm --ipc=host \
  -v "$(cd "$work" && (pwd -W 2>/dev/null || pwd)):/work:ro" \
  -v "$(cd "$snapshots" && (pwd -W 2>/dev/null || pwd)):/out" \
  "$image" bash /work/run.sh

echo "Linux baselines written to $snapshots"
