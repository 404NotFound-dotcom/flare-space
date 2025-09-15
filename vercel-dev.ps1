# Windows PowerShell script for Vercel development

# Check if Vercel CLI is installed
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Vercel CLI..."
    npm install -g vercel
}

# Build the project
Write-Host "Building project..."
pnpm run build

# Run Vercel development environment
Write-Host "Starting Vercel development environment..."
vercel dev