const Joi = require('joi'),
      fetch = require('node-fetch'),
      BookingManagerConf = require('../../config/APIConnector.APIs.config').BookingManager,
      BookingSchema = require('../../schema/booking/booking');

const routes =
 [
  {
    method: 'GET',
    path: '/api/booking',
    config: {
      tags: ['api'],
      description: "Get all bookings in storage",
      // auth: {
      //   scope: ["Admin", "User"]
      // }
    },
    handler: (request, h) => {
      return fetch(BookingManagerConf.uri + BookingManagerConf.bookingPath, {
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
    path: '/api/booking',
    config: {
      tags: ['api'],
      description: "Save a booking in storage",
      validate: {
        payload: BookingSchema
      },
      // auth: {
      //   scope: ["Admin"]
      // }
    },
    handler: (request, h) => {
      return fetch(BookingManagerConf.uri + BookingManagerConf.bookingPath, {
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
    path: '/api/booking/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific booking",
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
      return fetch(BookingManagerConf.uri + BookingManagerConf.bookingPath + "/" + request.params.id, {
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
    path: '/api/booking/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific booking",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: BookingSchema
      },
      // auth: {
      //   scope: ["Admin"]
      // }
    },
    handler: (request, h) => {
      return fetch(BookingManagerConf.uri + BookingManagerConf.bookingPath + "/" + request.params.id, {
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
    path: '/api/booking/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific booking",
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
      return fetch(BookingManagerConf.uri + BookingManagerConf.bookingPath + "/" + request.params.id, {
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
