# Vercel Deployment Guide

This project is configured for deployment on Vercel. Follow these steps to deploy:

## Prerequisites

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm install -g vercel`

## Project Structure for Vercel

The project has been configured for Vercel deployment with:

- **Static Files**: Built to `dist/spa/` directory
- **API Routes**: 
  - Located in the `api/` directory
  - Implemented as Vercel serverless functions
  - Main API handler in `api/index.ts`
  - Individual API endpoints in `api/ping/index.ts`, `api/demo/index.ts`
- **Configuration**: 
  - `vercel.json` defines build settings and routing rules
  - `.vercelignore` excludes unnecessary files from deployment

## Deployment Steps

### Option 1: Vercel Dashboard (Recommended)

1. Push your project to a GitHub repository
2. Log in to your Vercel dashboard
3. Click "New Project"
4. Import your GitHub repository
5. Configure project settings:
   - Build Command: `pnpm run vercel-build`
   - Output Directory: `dist/spa`
   - Install Command: `pnpm install`
   - Framework Preset: Vite
6. Deploy

### Option 2: Vercel CLI

1. Login to Vercel CLI:
   ```bash
   vercel login
   ```

2. Deploy directly from your local project:
   ```bash
   vercel
   ```

3. Follow the CLI prompts to configure your deployment

### Option 3: Local Testing Before Deployment

1. Run the included test script:
   ```bash
   # On Unix-like systems
   ./vercel-dev.sh
   
   # On Windows
   sh vercel-dev.sh
   ```

## Environment Variables

For proper functionality, set these environment variables in your Vercel project settings:

- `PING_MESSAGE`: Custom ping response (optional)
- Add any other environment variables your application needs

The project includes a `.env.production` file with default production values, but sensitive values should be set via the Vercel dashboard.

## Checking Deployment Status

1. Visit your project on the Vercel dashboard
2. Check the "Deployments" tab to see build status and logs

## API Endpoints

The following API endpoints are available:

- `/api/ping` - Returns a simple ping response
- `/api/demo` - Returns a demo message

## Notes

- The API routes are handled through serverless functions
- Static files are served from the `dist/spa` directory
- All routes fall back to `index.html` to support SPA routing
- The project uses TypeScript for both frontend and API code