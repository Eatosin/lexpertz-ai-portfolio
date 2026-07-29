#!/usr/bin/env bash
set -e

echo "==> 1. Installing project dependencies..."
npm ci

echo "==> 2. Installing OpenCode CLI..."
curl -fsSL https://opencode.ai/install.sh | bash

echo "==> 3. Installing global tools (ctx7, pnpm)..."
npm install -g ctx7 pnpm@9

echo "==> 4. Installing Python Pip & Headroom AI..."
sudo apt-get update && sudo apt-get install -y python3-pip
python3 -m pip install --break-system-packages "headroom-ai[all]" || true

echo "==> 5. Installing RTK (Rust Token Killer)..."
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/master/install.sh | sh || true
rtk init -g --opencode || true

echo "==> Setup Complete! All tools are ready."
