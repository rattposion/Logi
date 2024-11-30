module.exports = {
  apps: [
    {
      name: 'logistics-backend',
      script: 'dist/server/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};