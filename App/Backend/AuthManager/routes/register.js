const Joi = require('joi'),
      registerUser = require('../auth/functions/register'),
      UserSchema = require('../user/schema'),
      Boom = require('boom');

const routes = [
  {
    method: 'POST',
    path: '/register',
    config: {
      tags: ['api'],
      description: "Register a new user in storage",
      validate: {
        payload: UserSchema
      },
      auth: false
    },
    handler: (request, h) => {
      return registerUser(request.payload)
      .then(promisedRegisteredUser => {
        // if( !promisedRegisteredUser) throw new Error ('Registration error');
        if(Boom.isBoom(promisedRegisteredUser)) return Boom.forbidden("Mail already used by another user")
        return h.response(promisedRegisteredUser).code(201);
      })
      .catch(err => {
        // console.log(err);
        // return Boom.boomify(err);
        return err;
      })
    }
  }
];

exports.routes = server => server.route(routes);
