const Joi = require('joi'),
      Boom = require('boom');

const BeerTypeSchema = require('../beerType/schema');

const getAllBeerTypes = require('../beerType/functions/getAllBeerTypes');
const getBeerType = require('../beerType/functions/getBeerType');
const getManyBeerTypes = require('../beerType/functions/getManyBeerTypes');
const saveBeerType = require('../beerType/functions/saveBeerType');
const updateBeerType = require('../beerType/functions/updateBeerType');
const deleteBeerType = require('../beerType/functions/deleteBeerType');

const routes =
 [
  {
    method: 'GET',
    path: '/beerType',
    config: {
      tags: ['api'],
      description: "Get all beerTypes in storage",
      auth: {
        scope: ["SuperAdmin", "Admin", "User"]
      }
    },
    handler: (request, h) => {
      return getAllBeerTypes()
        .then(promisedBeerTypes => {
          return h.response(promisedBeerTypes).code(200);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured");
        })
    }
  },
  {
    method: 'POST',
    path: '/beerType',
    config: {
      tags: ['api'],
      description: "Save a beerType in storage",
      validate: {
        payload: BeerTypeSchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return saveBeerType(request.payload)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            return Boom.notFound("Beer type not found");
          }
          return h.response(promisedBoardType).code(201);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },
  {
    method: 'POST',
    path: '/beerType/getMany',
    config: {
      tags: ['api'],
      description: "Get the specified BeerTypes in payload from storage",
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
      return getManyBeerTypes(request.payload.ids)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            return Boom.notFound("Beer type not found");
          }
          return h.response(promisedBoardType).code(200);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'GET',
    path: '/beerType/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific beerType",
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
      return getBeerType(request.params.id)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            return Boom.notFound("Beer type not found");
          }
          return h.response(promisedBoardType).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'PUT',
    path: '/beerType/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific beerType",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: BeerTypeSchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return updateBeerType(request.params.id, request.payload)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            return Boom.notFound("Beer type not found");
          }
          return h.response(promisedBoardType).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'DELETE',
    path: '/beerType/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific beerType",
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
      return deleteBeerType(request.params.id)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            return Boom.notFound("Beer type not found");
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
