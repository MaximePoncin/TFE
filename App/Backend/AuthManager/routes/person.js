const Joi = require('joi'),
      Boom = require('boom');

const getAllPersons = require('../person/functions/getAllPersons');
const getPerson = require('../person/functions/getPerson');
const savePerson = require('../person/functions/savePerson');
const updatePerson = require('../person/functions/updatePerson');
const deletePerson = require('../person/functions/deletePerson');

const PersonSchema = require('../person/schema');

const routes =
 [
  {
    method: 'GET',
    path: '/person',
    config: {
      tags: ['api'],
      description: "Get all persons in storage",
      auth: {
        scope: ["Admin", "User"]
      }
    },
    handler: (request, h) => {
      return getAllPersons()
        .then(promisedPersons => {
          return h.response(promisedPersons).code(200);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured");
        })
    }
  },
  {
    method: 'POST',
    path: '/person',
    config: {
      tags: ['api'],
      description: "Save a person in storage",
      validate: {
        payload: PersonSchema
      },
      auth: {
        scope: ["Admin"]
      }
    },
    handler: (request, h) => {
      return savePerson(request.payload)
        .then(promisedPerson => {
          if (!promisedPerson) {
            // throw new Error('Error while saving user');
            return Boom.badImplementation("Error while saving user");
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
    path: '/person/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific person",
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      auth: {
        scope: ["Admin", "User"]
      }
    },
    handler: (request, h) => {
      return getPerson(request.params.id)
        .then(promisedPerson => {
          if (!promisedPerson) {
            // throw new Error('Error while getting person');
            return Boom.notFound("No such person found");
          }
          return h.response(promisedPerson).code(200);
        })
        .catch(err => {
          console.log(err);
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'PUT',
    path: '/person/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific person",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: PersonSchema
      },
      auth: {
        scope: ["Admin"]
      }
    },
    handler: (request, h) => {
      return updatePerson(request.params.id, request.payload)
        .then(promisedPerson => {
          if (!promisedPerson) {
            return Boom.notFound("Cannot found this person");
          }
          return h.response(promisedPerson).code(200);
        })
        .catch(err => {
          return Boom.badImplementation("An internal error occured", err);
        })
    }
  },{
    method: 'DELETE',
    path: '/person/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific person",
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      auth: {
        scope: ["Admin"]
      }
    },
    handler: (request, h) => {
      return deletePerson(request.params.id)
        .then(promisedPerson => {
          if (!promisedPerson) {
            // throw new Error('Error while deleting person');
            return Boom.notFound("Cannot found this person");
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
