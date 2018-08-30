const Joi = require('joi'),
      fetch = require('node-fetch'),
      BookingManagerConf = require('../../config/APIConnector.APIs.config').BookingManager,
      StandingSchema = require('../../schema/booking/standing');

const routes =
 [
  {
    method: 'GET',
    path: '/api/standing',
    config: {
      tags: ['api'],
      description: "Get all standings in storage",
      // auth: {
      //   scope: ["Admin", "User"]
      // }
    },
    handler: (request, h) => {
      return fetch(BookingManagerConf.uri + BookingManagerConf.standingPath, {
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
    path: '/api/standing',
    config: {
      tags: ['api'],
      description: "Save a standing in storage",
      validate: {
        payload: StandingSchema
      },
      // auth: {
      //   scope: ["Admin"]
      // }
    },
    handler: (request, h) => {
      return fetch(BookingManagerConf.uri + BookingManagerConf.standingPath, {
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
    path: '/api/standing/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific standing",
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
      return fetch(BookingManagerConf.uri + BookingManagerConf.standingPath + "/" + request.params.id, {
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
    path: '/api/standing/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific standing",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: StandingSchema
      },
      // auth: {
      //   scope: ["Admin"]
      // }
    },
    handler: (request, h) => {
      return fetch(BookingManagerConf.uri + BookingManagerConf.standingPath + "/" + request.params.id, {
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
    path: '/api/standing/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific standing",
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
      return fetch(BookingManagerConf.uri + BookingManagerConf.standingPath + "/" + request.params.id, {
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
