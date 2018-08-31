const Joi = require('joi'),
      Boom = require('boom');

const ThemeSchema = require('../theme/schema');

const getAllThemes = require('../theme/functions/getAllThemes');
const getTheme = require('../theme/functions/getTheme');
const saveTheme = require('../theme/functions/saveTheme');
const updateTheme = require('../theme/functions/updateTheme');
const deleteTheme = require('../theme/functions/deleteTheme');

const routes =
 [
  {
    method: 'GET',
    path: '/theme',
    config: {
      tags: ['api'],
      description: "Get all themes in storage",
      auth: {
        scope: ["SuperAdmin", "Admin", "User"]
      }
    },
    handler: (request, h) => {
      return getAllThemes()
        .then(promisedThemes => {
          return h.response(promisedThemes).code(200);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured");
        })
    }
  },
  {
    method: 'POST',
    path: '/theme',
    config: {
      tags: ['api'],
      description: "Save a theme in storage",
      validate: {
        payload: ThemeSchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return saveTheme(request.payload)
        .then(promisedStanding => {
          if (!promisedStanding) {
            return Boom.badImplementation("Error while creating the theme");
          }
          return h.response(promisedStanding).code(201);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'GET',
    path: '/theme/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific theme",
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
      return getTheme(request.params.id)
        .then(promisedStanding => {
          if (!promisedStanding) {
            return Boom.notFound("Theme not found");
          }
          return h.response(promisedStanding).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'PUT',
    path: '/theme/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific theme",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: ThemeSchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return updateTheme(request.params.id, request.payload)
        .then(promisedStanding => {
          if (!promisedStanding) {
            return Boom.notFound("Theme not found");
          }
          return h.response(promisedStanding).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'DELETE',
    path: '/theme/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific theme",
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
      return deleteTheme(request.params.id)
        .then(promisedStanding => {
          if (!promisedStanding) {
            return Boom.notFound("Theme not found");
          }
          return h.response(promisedStanding).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  }
];

exports.routes = server => server.route(routes);
