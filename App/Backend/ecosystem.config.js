module.exports = {
  apps : [{
      name      : "APIConnector",
      script    : "./APIConnector/index.js",
      watch: true,
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    },
    {
      name      : "AuthManager",
      script    : "./AuthManager/index.js",
      watch: true,
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    },
    {
      name      : "BeerTypeManager",
      script    : "./BeerTypeManager/index.js",
      watch: true,
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    },
    {
      name      : "BookingManager",
      script    : "./BookingManager/index.js",
      watch: true,
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    },
    {
      name      : "StayManager",
      script    : "./StayManager/index.js",
      watch: true,
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    },
    {
      name      : "AdvertisingClientManager",
      script    : "./AdvertisingClientManager/index.js",
      watch: true,
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    },
    {
      name      : "MailManager",
      script    : "./MailManager/index.js",
      watch: true,
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    }
  ]
}
