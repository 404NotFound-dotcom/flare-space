#!/bin/bash

# Build client files
npm run build:client

# Build server files
npm run build:server

# Ensure API directory is available for Vercel
mkdir -p .vercel/output/functions/api

# Compile API handler
npx tsc api/index.ts --outDir .vercel/output/functions/api --esModuleInterop --skipLibCheck

# Copy static files to Vercel output
cp -r dist/spa .vercel/output/static

echo "Build completed for Vercel deployment"