const Joi = require('joi'),
      Boom = require('boom');

const StaySchema = require('../stay/schema');

const getAllStays = require('../stay/functions/getAllStays');
const getStay = require('../stay/functions/getStay');
const saveStay = require('../stay/functions/saveStay');
const updateStay = require('../stay/functions/updateStay');
const deleteStay = require('../stay/functions/deleteStay');

const routes =
 [
  {
    method: 'GET',
    path: '/stay',
    config: {
      tags: ['api'],
      description: "Get all stays in storage",
      auth: false
    },
    handler: (request, h) => {
      return getAllStays()
      .then(promisedStays => {
        return h.response(promisedStays).code(200);
      })
      .catch(err => {
        console.log(err);
        return Boom.badImplementation("An internal error occured");
      })
    }
  },
  {
    method: 'POST',
    path: '/stay',
    config: {
      tags: ['api'],
      description: "Save a stay in storage",
      validate: {
        payload: StaySchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return saveStay(request.payload)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            return Boom.badImplementation("An internal error occured");
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
    path: '/stay/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific stay",
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      auth: false
    },
    handler: (request, h) => {
      return getStay(request.params.id)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            return Boom.notFound("Stay not found");
          }
          return h.response(promisedBoardType).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'PUT',
    path: '/stay/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific stay",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: StaySchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return updateStay(request.params.id, request.payload)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            return Boom.notFound("Stay not found");
          }
          return h.response(promisedBoardType).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'DELETE',
    path: '/stay/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific stay",
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
      return deleteStay(request.params.id)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            return Boom.notFound("Stay not found");
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
