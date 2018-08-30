const Joi = require('joi');

const ActivitySchema = require('../activity/schema');

const getAllActivities = require('../activity/functions/getAllActivities');
const getActivity = require('../activity/functions/getActivity');
const saveActivity = require('../activity/functions/saveActivity');
const updateActivity = require('../activity/functions/updateActivity');
const deleteActivity = require('../activity/functions/deleteActivity');
const getManyActivities = require('../activity/functions/getManyActivities');

const routes =
 [
  {
    method: 'GET',
    path: '/activity',
    config: {
      tags: ['api'],
      description: "Get all activities in storage",
      auth: {
        scope: ["SuperAdmin", "Admin", "User"]
      }
    },
    handler: (request, h) => {
      return getAllActivities();
    }
  },
  {
    method: 'POST',
    path: '/activity',
    config: {
      tags: ['api'],
      description: "Save a activity in storage",
      validate: {
        payload: ActivitySchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return saveActivity(request.payload)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            throw new Error('Error while saving activity');
          }
          return promisedBoardType;
        })
        .catch(err => {
          console.log(err);
          return err;
        })
    }
  },{
    method: 'GET',
    path: '/activity/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific activity",
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
      return getActivity(request.params.id)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            throw new Error('Error while getting activity');
          }
          return promisedBoardType;ActivitySchema
        })
        .catch(err => {
          return err;
        })
    }
  },{
    method: 'PUT',
    path: '/activity/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific activity",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: ActivitySchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return updateActivity(request.params.id, request.payload)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            throw new Error('Error while updating activity');
          }
          return promisedBoardType;
        })
        .catch(err => {
          return err;
        })
    }
  },{
    method: 'DELETE',
    path: '/activity/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific activity",
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
      return deleteActivity(request.params.id)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            throw new Error('Error while deleting activity');
          }
          return promisedBoardType;
        })
        .catch(err => {
          return err;
        })
    }
  },{
    method: 'POST',
    path: '/activity/getMany',
    config: {
      tags: ['api'],
      description: "Get the specified activities in payload",
      validate: {
        payload: {
          ids: Joi.array().items(Joi.string().required())
        }
      },
      auth: {
        scope: ["SuperAdmin", "Admin", "User"]
      }
    },
    handler: (request, h) => {
      console.log(request.payload);
      return getManyActivities(request.payload.ids)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            throw new Error('Error while getting activities');
          }
          return promisedBoardType;
        })
        .catch(err => {
          return err;
        })
    }
  }
];

exports.routes = server => server.route(routes);
