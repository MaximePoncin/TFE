const Joi = require('joi');

const AdvertisingClientSchema = require('../advertisingClient/schema');

const getAllAdvertisingClients = require('../advertisingClient/functions/getAllAdvertisingClients');
const getAdvertisingClient = require('../advertisingClient/functions/getAdvertisingClient');
const saveAdvertisingClient = require('../advertisingClient/functions/saveAdvertisingClient');
const updateAdvertisingClient = require('../advertisingClient/functions/updateAdvertisingClient');
const deleteAdvertisingClient = require('../advertisingClient/functions/deleteAdvertisingClient');

const routes =
 [
  {
    method: 'GET',
    path: '/advertisingClient',
    config: {
      tags: ['api'],
      description: "Get all advertisingClients in storage",
      auth: {
        scope: ["SuperAdmin", "Admin", "User"]
      }
    },
    handler: (request, h) => {
      return getAllAdvertisingClients();
    }
  },
  {
    method: 'POST',
    path: '/advertisingClient',
    config: {
      tags: ['api'],
      description: "Save a advertisingClient in storage",
      validate: {
        payload: AdvertisingClientSchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return saveAdvertisingClient(request.payload)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            throw new Error('Error while saving advertisingClient');
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
    path: '/advertisingClient/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific advertisingClient",
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
      return getAdvertisingClient(request.params.id)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            throw new Error('Error while getting advertisingClient');
          }
          return promisedBoardType;
        })
        .catch(err => {
          return err;
        })
    }
  },{
    method: 'PUT',
    path: '/advertisingClient/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific advertisingClient",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: AdvertisingClientSchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return updateAdvertisingClient(request.params.id, request.payload)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            throw new Error('Error while updating advertisingClient');
          }
          return promisedBoardType;
        })
        .catch(err => {
          return err;
        })
    }
  },{
    method: 'DELETE',
    path: '/advertisingClient/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific advertisingClient",
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
      return deleteAdvertisingClient(request.params.id)
        .then(promisedBoardType => {
          if (!promisedBoardType) {
            throw new Error('Error while deleting advertisingClient');
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
