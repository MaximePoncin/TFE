const Joi = require('joi');

const authUser = require('../auth/functions/auth');

const routes = [
  {
    method: 'POST',
    path: '/auth',
    config: {
      tags: ['api'],
      description: "Authenticate a user",
      validate: {
        payload: {
          userId: Joi.string().required().example('mail@test.com'),
          userPasswd: Joi.string().required().example('1234')
        }
      },
      auth: false
    },
    handler: (request, h) => {
      return authUser(request.payload.userId, request.payload.userPasswd)
        .then(promisedAuth => {
          if (!promisedAuth) {
            throw new Error('Error while authentication');
          }
          return promisedAuth;
        })
        .catch(err => {
          return err;
        })
    }
  }
];

exports.routes = server => server.route(routes);
