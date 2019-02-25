const Joi = require('joi'),
      Boom = require('boom');

const getAllUsers = require('../user/functions/getAllUsers');
const getUser = require('../user/functions/getUser');
const getUserByMail = require('../user/functions/getUserByMail');
const saveUser = require('../user/functions/saveUser');
const updateUser = require('../user/functions/updateUser');
const deleteUser = require('../user/functions/deleteUser');

const SchemaUser = require('../user/schema');

const routes =
 [
  {
    method: 'GET',
    path: '/user',
    config: {
      tags: ['api'],
      description: "Get all users in storage",
      auth: {
        scope: ["SuperAdmin", "Admin", "User"]
      }
    },
    handler: (request, h) => {
      return getAllUsers()
        .then(promisedUsers => {
          return h.response(promisedUsers).code(200);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured");
        })
    }
  },
  {
    method: 'POST',
    path: '/user',
    config: {
      tags: ['api'],
      description: "Save a user in storage",
      validate: {
        payload: SchemaUser
      },
      auth: false
    },
    handler: (request, h) => {
      return saveUser(request.payload)
        .then(promisedUser => {
          if (!promisedUser) {
            return Boom.notFound("User not found");
          }
          return h.response(promisedUser).code(201);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'GET',
    path: '/user/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific user",
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      auth: {
        scope: ["SuperAdmin", "Admin", "User"]
      }
    },
    handler: (request, h) => {
      return getUser(request.params.id)
        .then(promisedUser => {
          if (!promisedUser) {
            return Boom.notFound("User not found");
          }
          return h.response(promisedUser).code(200);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'GET',
    path: '/userByMail/{mail}',
    config: {
      tags: ['api'],
      description: "Get a specific user",
      validate: {
        params: {
          mail: Joi.string().email().required()
        }
      },
      auth: {
        scope: ["SuperAdmin", "Admin", "User"]
      }
    },
    handler: (request, h) => {
      return getUserByMail(request.params.mail)
        .then(promisedUser => {
          if (!promisedUser) {
            // throw new Error('Error while getting user');
            return Boom.notFound("User not found");
          }
          return h.response(promisedUser).code(200);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'PUT',
    path: '/user/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific user",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: SchemaUser
      },
      auth: {
        scope: ["SuperAdmin", "Admin", "User"]
      }
    },
    handler: (request, h) => {
      return updateUser(request.params.id, request.payload)
        .then(promisedUser => {
          if (!promisedUser) {
            return Boom.notFound("User not found");
          }
          return h.response(promisedUser).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'DELETE',
    path: '/user/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific user",
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return deleteUser(request.params.id)
        .then(promisedUser => {
          if (!promisedUser) {
            return Boom.notFound("User not found");
          }
          return h.response(promisedUser).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  }
];

exports.routes = server => server.route(routes);
