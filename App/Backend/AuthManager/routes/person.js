const Joi = require('joi');

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
      return getAllPersons();
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
            throw new Error('Error while saving user');
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
            throw new Error('Error while getting person');
          }
          return promisedPerson;
        })
        .catch(err => {
          return err;
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
            throw new Error('Error while updating person');
          }
          return promisedPerson;
        })
        .catch(err => {
          return err;
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
            throw new Error('Error while deleting person');
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
