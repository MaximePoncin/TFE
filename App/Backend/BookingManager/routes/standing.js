const Joi = require('joi'),
      Boom = require('boom');

const StandingSchema = require('../standing/schema');

const getAllStandings = require('../standing/functions/getAllStandings');
const getStanding = require('../standing/functions/getStanding');
const saveStanding = require('../standing/functions/saveStanding');
const updateStanding = require('../standing/functions/updateStanding');
const deleteStanding = require('../standing/functions/deleteStanding');

const routes =
 [
  {
    method: 'GET',
    path: '/standing',
    config: {
      tags: ['api'],
      description: "Get all standings in storage",
      auth: {
        scope: ["SuperAdmin", "Admin", "User"]
      }
    },
    handler: (request, h) => {
      return getAllStandings()
        .then(promisedStanding => {
          if(!promisedStanding) return Boom.notFound("Standings not found")
          return h.response(promisedStanding).code(200);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },
  {
    method: 'POST',
    path: '/standing',
    config: {
      tags: ['api'],
      description: "Save a standing in storage",
      validate: {
        payload: StandingSchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return saveStanding(request.payload)
        .then(promisedStanding => {
          if (!promisedStanding) {
            return Boom.notFound("Standing not found");
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
    path: '/standing/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific standing",
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
      return getStanding(request.params.id)
        .then(promisedStanding => {
          if (!promisedStanding) {
            return Boom.notFound("Standing not found");
          }
          return h.response(promisedStanding).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'PUT',
    path: '/standing/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific standing",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: StandingSchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return updateStanding(request.params.id, request.payload)
        .then(promisedStanding => {
          if (!promisedStanding) {
            return Boom.notFound("Standing not found");
          }
          return h.response(promisedStanding).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'DELETE',
    path: '/standing/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific standing",
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
      return deleteStanding(request.params.id)
        .then(promisedStanding => {
          if (!promisedStanding) {
            return Boom.notFound("Standing not found");
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
