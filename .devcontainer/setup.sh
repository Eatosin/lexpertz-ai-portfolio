#!/usr/bin/env bash
set -e

echo "==> 1. Installing PNPM and OpenCode CLI..."
npm install -g pnpm@9 opencode-ai

echo "==> 2. Installing Python Pip & Headroom AI..."
sudo apt-get update && sudo apt-get install -y python3-pip
python3 -m pip install --break-system-packages "headroom-ai[all]" || true

echo "==> 3. Installing RTK (Rust Token Killer)..."
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/master/install.sh | sh || true
rtk init -g --opencode || true

echo "==> 4. Hydrating Project Dependencies via PNPM..."
pnpm install

echo "==> Setup Complete! All tools are ready."
