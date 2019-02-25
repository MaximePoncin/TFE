const Joi = require('joi');

const getAllSalePoints = require('../salePoint/functions/getAllSalePoints');
const getSalePoint = require('../salePoint/functions/getSalePoint');
const saveSalePoint = require('../salePoint/functions/saveSalePoint');
const updateSalePoint = require('../salePoint/functions/updateSalePoint');
const deleteSalePoint = require('../salePoint/functions/deleteSalePoint');

const SalePointSchema = require('../salePoint/schema');

const routes =
 [
  {
    method: 'GET',
    path: '/salePoint',
    config: {
      tags: ['api'],
      description: "Get all salePoints in storage",
      auth: {
        scope: ["SuperAdmin", "Admin", "User"]
      }
    },
    handler: (request, h) => {
      return getAllSalePoints()
        .then(promisedSalePoints => {
          return h.response(promisedSalePoints).code(200);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured");
        })
    }
  },
  {
    method: 'POST',
    path: '/salePoint',
    config: {
      tags: ['api'],
      description: "Save a salePoint in storage",
      validate: {
        payload: SalePointSchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return saveSalePoint(request.payload)
        .then(promisedPerson => {
          if (!promisedPerson) {
            return Boom.notFound("Sale point not found");
          }
          return h.response(promisedPerson).code(201);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'GET',
    path: '/salePoint/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific salePoint",
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
      return getSalePoint(request.params.id)
        .then(promisedPerson => {
          if (!promisedPerson) {
            return Boom.notFound("Sale point not found");
          }
          return h.response(promisedPerson).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'PUT',
    path: '/salePoint/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific salePoint",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: SalePointSchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return updateSalePoint(request.params.id, request.payload)
        .then(promisedPerson => {
          if (!promisedPerson) {
            return Boom.notFound("Sale point not found");
          }
          return h.response(promisedPerson).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'DELETE',
    path: '/salePoint/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific salePoint",
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
      return deleteSalePoint(request.params.id)
        .then(promisedPerson => {
          if (!promisedPerson) {
            return Boom.notFound("Sale point not found");
          }
          return h.response(promisedPerson).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  }
];

exports.routes = server => server.route(routes);
