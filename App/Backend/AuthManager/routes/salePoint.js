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
      return getAllSalePoints();
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
            throw new Error('Error while saving salePoint');
          }
          return promisedPerson;
        })
        .catch(err => {
          console.log(err);
          return err;
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
            throw new Error('Error while getting salePoint');
          }
          return promisedPerson;
        })
        .catch(err => {
          return err;
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
            throw new Error('Error while updating salePoint');
          }
          return promisedPerson;
        })
        .catch(err => {
          return err;
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
            throw new Error('Error while deleting salePoint');
          }
          return promisedPerson;
        })
        .catch(err => {
          return err;
        })
    }
  }
];

exports.routes = server => server.route(routes);
