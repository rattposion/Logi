#!/bin/bash

# Build frontend
echo "Building frontend..."
npm run build

# Create server dist directory
echo "Preparing server files..."
mkdir -p dist/server

# Compile TypeScript server files
echo "Compiling server files..."
tsc src/server/**/*.ts --outDir dist/server --esModuleInterop true --module commonjs

# Copy necessary server files
echo "Copying configuration files..."
cp ecosystem.config.js dist/
cp .env.production dist/.env
cp package.json dist/

echo "Deployment files prepared successfully!"