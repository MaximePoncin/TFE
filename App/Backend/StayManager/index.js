'use strict';

// === Basic setup ===
var Hapi = require('hapi');

var server = new Hapi.server(require('./config/StayManager.server.config'));

const validate = async function (decoded, request) {
  if (decoded.scope) {
    return {
      isValid: true
    }
  }

  return {
    isValid: false
  }
};

const init = async () => {
  // hapi-swagger for documented API
  await server.register([
    require('inert'),
    require('vision'),
    {
      plugin: require('hapi-swagger'),
      options: {
        //version: '1.0.0'
      }
    }
  ]);

  // hapi-auth-jwt2 for jsonWebToken authentication
  await server.register(require('hapi-auth-jwt2'));

  // Define the authentication strategy => see validate method
  server.auth.strategy('jwt', 'jwt',
    {
      key: 'passwd',
      validate: validate,
      verifyOptions: {
        algorithms: ['HS256']
      }
    });
  // Define the authentication with jwt as the default strategy
  server.auth.default('jwt');

  // hapi-routes to import all files in the routes directory as routes
  await server.register({
    plugin: require('hapi-routes'),
    options: {
      // dir: __dirname + '//routes',
      dir: __dirname + '/routes/*'
    },
  });

  try {
    await server.start();
    console.log('StayManager Service running at: ', server.info.uri);
  } catch (err) {
    console.log(err);
  }

  // server.route(require('./routes/routes'));
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
