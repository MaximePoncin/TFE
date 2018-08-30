const Joi = require('joi');

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
      return getAllBoardTypes();
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
            throw new Error('Error while saving boardType');
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
            throw new Error('Error while getting boardType');
          }
          return promisedBoardType;
        })
        .catch(err => {
          return err;
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
            throw new Error('Error while updating boardType');
          }
          return promisedBoardType;
        })
        .catch(err => {
          return err;
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
            throw new Error('Error while deleting boardType');
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
