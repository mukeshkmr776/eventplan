module.exports = {
  apps: [{
    name: "Node.js App",
    script: './index.js',
    watch: false,
    exec_mode  : "cluster",
    instances : "max",
    increment_var : 'PORT',
    namespace: "backend",
    env: {
      "PORT": 8080,
      "NODE_ENV": "development"
    },
    env_production: {
      "PORT": 8080,
      "NODE_ENV": "production"
    }
  }]
};