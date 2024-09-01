module.exports = {
  apps: [
    {
      name: "tsuutina-admin", // Your app name
      script: "index.js", // The entry point of your application
      instances: "max", // Scales to the number of available CPUs
      exec_mode: "cluster", // Enables cluster mode for load balancing
      env: {
        NODE_ENV: "development", // Environment variables for development
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: "production", // Environment variables for production
        PORT: 8080,
      },
    },
  ],
};
