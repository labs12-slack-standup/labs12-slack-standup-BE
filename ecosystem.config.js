module.exports = {
    apps : [{
      name: 'Stand-em-ups API',
      script: 'server.js',
      instances: 'max',
      autorestart: true,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }]
  };