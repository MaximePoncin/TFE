const Joi = require('joi'),
      Boom = require('boom');

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
      auth: false
    },
    handler: (request, h) => {
      return getAllActivities()
      .then(promisedActivities => {
        return h.response(promisedActivities).code(200);
      })
      .catch(err => {
        console.log(err);
        return Boom.badImplementation("An internal error occured");
      })
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
            return Boom.notFound("Activity not found");
          }
          return h.response(promisedBoardType).code(201);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured", err);
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
      auth: false
    },
    handler: (request, h) => {
      return getActivity(request.params.id)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            return Boom.notFound("Activity not found");
          }
          return h.response(promisedBoardType).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
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
            return Boom.notFound("Activity not found");
          }
          return h.response(promisedBoardType).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
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
            return Boom.notFound("Activity not found");
          }
          return h.response(promisedBoardType).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
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
      auth: false
    },
    handler: (request, h) => {
      console.log(request.payload);
      return getManyActivities(request.payload.ids)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            return Boom.notFound("Activity not found");
          }
          return h.response(promisedBoardType).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  }
];

exports.routes = server => server.route(routes);
