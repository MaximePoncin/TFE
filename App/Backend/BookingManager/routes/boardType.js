const Joi = require('joi'),
      Boom = require('boom');

const BoardTypeSchema = require('../boardType/schema');

const getAllBoardTypes = require('../boardType/functions/getAllBoardTypes');
const getBoardType = require('../boardType/functions/getBoardType');
const saveBoardType = require('../boardType/functions/saveBoardType');
const updateBoardType = require('../boardType/functions/updateBoardType');
const deleteBoardType = require('../boardType/functions/deleteBoardType');

const routes =
 [
  {
    method: 'GET',
    path: '/boardType',
    config: {
      tags: ['api'],
      description: "Get all boardTypes in storage",
      auth: {
        scope: ["SuperAdmin", "Admin", "User"]
      }
    },
    handler: (request, h) => {
      return getAllBoardTypes()
        .then(promisedBoardTypes => {
          return h.response(promisedBoardTypes).code(200);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured");
        })
    }
  },
  {
    method: 'POST',
    path: '/boardType',
    config: {
      tags: ['api'],
      description: "Save a boardType in storage",
      validate: {
        payload: BoardTypeSchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return saveBoardType(request.payload)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            return Boom.notFound("Board type not found");
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
    path: '/boardType/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific boardType",
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
      return getBoardType(request.params.id)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            return Boom.notFound("Board type not found");
          }
          return h.response(promisedBoardType).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'PUT',
    path: '/boardType/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific boardType",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: BoardTypeSchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return updateBoardType(request.params.id, request.payload)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            return Boom.notFound("Board type not found");
          }
          return h.response(promisedBoardType).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'DELETE',
    path: '/boardType/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific boardType",
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
      return deleteBoardType(request.params.id)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            return Boom.notFound("Board type not found");
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
