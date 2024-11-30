#!/bin/bash

# Update package.json build script
echo "Building application..."
npm run build

# Create dist directory for server
mkdir -p dist/server

# Compile TypeScript server files
echo "Compiling server files..."
tsc src/server/**/*.ts --outDir dist/server --esModuleInterop true --module commonjs

# Copy necessary files
echo "Copying configuration files..."
cp ecosystem.config.js dist/
cp .env dist/
cp package.json dist/

# Create production .env if it doesn't exist
if [ ! -f dist/.env ]; then
  echo "Creating production .env..."
  cat > dist/.env << EOL
# Database Configuration
DATABASE_URL=mysql://user:password@localhost:3306/logistics_db
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=logistics_db

# Server Configuration
PORT=3000
NODE_ENV=production

# JWT Secret
JWT_SECRET=your-production-secret-key
EOL
fi

echo "Deployment files prepared successfully!"