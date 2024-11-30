#!/bin/bash

# Configurações
BACKEND_SERVER="user@your-server"
FRONTEND_SERVER="user@your-server"
BACKEND_PATH="/var/www/logistics-backend"
FRONTEND_PATH="/var/www/logistics-frontend"

# Build do back-end
echo "Building backend..."
cd backend
npm run build
cd ..

# Build do front-end
echo "Building frontend..."
npm run build

# Deploy do back-end
echo "Deploying backend..."
rsync -avz --delete backend/dist/ $BACKEND_SERVER:$BACKEND_PATH/dist/
rsync -avz backend/package*.json backend/ecosystem.config.js backend/.env $BACKEND_SERVER:$BACKEND_PATH/

# Deploy do front-end
echo "Deploying frontend..."
rsync -avz --delete dist/ $FRONTEND_SERVER:$FRONTEND_PATH/dist/

# Reiniciar back-end
ssh $BACKEND_SERVER "cd $BACKEND_PATH && npm install --production && pm2 restart ecosystem.config.js --env production"

echo "Deployment completed successfully!"