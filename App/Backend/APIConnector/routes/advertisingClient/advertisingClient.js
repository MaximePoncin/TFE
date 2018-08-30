const Joi = require('joi');
const fetch = require('node-fetch');
const AdvertisingClientManagerConf = require('../../config/APIConnector.APIs.config').AdvertisingClientManager;

const AdvertisingClientSchema = require('../../schema/advertisingClient/advertisingClient');

const routes =
 [
  {
    method: 'GET',
    path: '/api/advertisingClient',
    config: {
      tags: ['api'],
      description: "Get all advertisingClients in storage",
      // auth: {
      //   scope: ["Admin", "User"]
      // }
    },
    handler: (request, h) => {
      return fetch(AdvertisingClientManagerConf.uri + AdvertisingClientManagerConf.advertisingClientPath, {
        method: 'GET',
        headers: {
          'Authorization': request.headers.authorization,
        }
      })
      .then(response => {
        //console.log(response.json());
        return response.json();
      })
      .then(jsonPromise => {
        return jsonPromise;
        //jsonPromise.then()
      })
      .catch(err => {
        return err;
      })
    }
  },
  {
    method: 'POST',
    path: '/api/advertisingClient',
    config: {
      tags: ['api'],
      description: "Save a advertisingClient in storage",
      validate: {
        payload: AdvertisingClientSchema
      },
      // auth: {
      //   scope: ["Admin"]
      // }
    },
    handler: (request, h) => {
      return fetch(AdvertisingClientManagerConf.uri + AdvertisingClientManagerConf.advertisingClientPath, {
        method: 'POST',
        headers: {
          'Authorization': request.headers.authorization,
        },
        body: JSON.stringify(request.payload)
      })
      .then(response => {
        //console.log(response.json());
        return response.json();
      })
      .then(jsonPromise => {
        return jsonPromise;
        //jsonPromise.then()
      })
      .catch(err => {
        return err;
      })
    }
  },{
    method: 'GET',
    path: '/api/advertisingClient/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific advertisingClient",
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      // auth: {
      //   scope: ["Admin", "User"]
      // }
    },
    handler: (request, h) => {
      return fetch(AdvertisingClientManagerConf.uri + AdvertisingClientManagerConf.advertisingClientPath + "/" + request.params.id, {
        method: 'GET',
        headers: {
          'Authorization': request.headers.authorization,
        }
      })
      .then(response => {
        //console.log(response.json());
        return response.json();
      })
      .then(jsonPromise => {
        return jsonPromise;
        //jsonPromise.then()
      })
      .catch(err => {
        return err;
      })
    }
  },{
    method: 'PUT',
    path: '/api/advertisingClient/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific advertisingClient",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: AdvertisingClientSchema
      },
      // auth: {
      //   scope: ["Admin"]
      // }
    },
    handler: (request, h) => {
      return fetch(AdvertisingClientManagerConf.uri + AdvertisingClientManagerConf.advertisingClientPath + "/" + request.params.id, {
        method: 'PUT',
        headers: {
          'Authorization': request.headers.authorization,
        },
        body: JSON.stringify(request.payload)
      })
      .then(response => {
        //console.log(response.json());
        return response.json();
      })
      .then(jsonPromise => {
        return jsonPromise;
        //jsonPromise.then()
      })
      .catch(err => {
        return err;
      })
    }
  },{
    method: 'DELETE',
    path: '/api/advertisingClient/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific advertisingClient",
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      // auth: {
      //   scope: ["Admin"]
      // }
    },
    handler: (request, h) => {
      return fetch(AdvertisingClientManagerConf.uri + AdvertisingClientManagerConf.advertisingClientPath + "/" + request.params.id, {
        method: 'DELETE',
        headers: {
          'Authorization': request.headers.authorization,
        }
      })
      .then(response => {
        //console.log(response.json());
        return response.json();
      })
      .then(jsonPromise => {
        return jsonPromise;
        //jsonPromise.then()
      })
      .catch(err => {
        return err;
      })
    }
  }
];

exports.routes = server => server.route(routes);
