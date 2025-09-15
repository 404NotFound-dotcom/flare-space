#!/bin/bash

# This script helps test Vercel deployment locally

# Install Vercel CLI if not already installed
if ! command -v vercel &> /dev/null; then
  echo "Installing Vercel CLI..."
  npm install -g vercel
fi

# Build the project
echo "Building project..."
pnpm run build

# Run Vercel development environment
echo "Starting Vercel development environment..."
vercel dev