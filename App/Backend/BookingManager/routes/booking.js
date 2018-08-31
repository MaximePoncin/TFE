const Joi = require('joi'),
      Boom = require('boom');

const BookingSchema = require('../booking/schema');

const getAllBookings = require('../booking/functions/getAllBookings');
const getBooking = require('../booking/functions/getBooking');
const saveBooking = require('../booking/functions/saveBooking');
const updateBooking = require('../booking/functions/updateBooking');
const deleteBooking = require('../booking/functions/deleteBooking');

const routes =
 [
  {
    method: 'GET',
    path: '/booking',
    config: {
      tags: ['api'],
      description: "Get all bookings in storage",
      auth: {
        scope: ["SuperAdmin", "Admin", "User"]
      }
    },
    handler: (request, h) => {
      return getAllBookings()
        .then(promisedBookings => {
          return h.response(promisedBookings).code(200);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured");
        })
    }
  },
  {
    method: 'POST',
    path: '/booking',
    config: {
      tags: ['api'],
      description: "Save a booking in storage",
      validate: {
        payload: BookingSchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin", "User"]
      }
    },
    handler: (request, h) => {
      return saveBooking(request.payload)
        .then(promisedStanding => {
          if (!promisedStanding) {
            return Boom.notFound("Booking not found");
          }
          return h.response(promisedStanding).code(201);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'GET',
    path: '/booking/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific booking",
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
      return getBooking(request.params.id)
        .then(promisedStanding => {
          if (!promisedStanding) {
            return Boom.notFound("Booking not found");
          }
          return h.response(promisedStanding).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'PUT',
    path: '/booking/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific booking",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: BookingSchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin"]
      }
    },
    handler: (request, h) => {
      return updateBooking(request.params.id, request.payload)
        .then(promisedStanding => {
          if (!promisedStanding) {
            return Boom.notFound("Booking not found");
          }
          return h.response(promisedStanding).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'DELETE',
    path: '/booking/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific booking",
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
      return deleteBooking(request.params.id)
        .then(promisedStanding => {
          if (!promisedStanding) {
            return Boom.notFound("Booking not found");
          }
          return h.response(promisedStanding).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  }
];

exports.routes = server => server.route(routes);
