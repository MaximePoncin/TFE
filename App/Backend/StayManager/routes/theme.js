const Joi = require('joi');

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
      auth: false
    },
    handler: (request, h) => {
      return getAllThemes();
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
            throw new Error('Error while saving theme');
          }
          return promisedStanding;
        })
        .catch(err => {
          console.log(err);
          return err;
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
      auth: false
    },
    handler: (request, h) => {
      return getTheme(request.params.id)
        .then(promisedStanding => {
          if (!promisedStanding) {
            throw new Error('Error while getting theme');
          }
          return promisedStanding;
        })
        .catch(err => {
          return err;
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
            throw new Error('Error while updating theme');
          }
          return promisedStanding;
        })
        .catch(err => {
          return err;
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
            throw new Error('Error while deleting theme');
          }
          return promisedStanding;
        })
        .catch(err => {
          return err;
        })
    }
  }
];

exports.routes = server => server.route(routes);
