const Joi = require('joi')
      Boom = require('boom');

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
            return Boom.badImplementation("An internal error occured");
          }
          return h.response(promisedAuth).code(200);
        })
        .catch(err => {
          console.log(err);
          return h.response(err).code(500);
        })

    //   if(authResult.error) {
    //     switch (authResult.error) {
    //       case "Error while authentication":
    //         return h.response(authResult).code(500);
    //       case "Wrong credentials":
    //         return h.response(authResult).code(200);
    //       // default:
    //     }
    //   } else {
    //     return h.reponse(authResult).code(200);
    //   }
    }
  }
];

exports.routes = server => server.route(routes);
