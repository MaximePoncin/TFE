const Joi = require('joi');
const fetch = require('node-fetch');
const authManagerConf = require('../../config/APIConnector.APIs.config').AuthManager;

const UserSchema = require('../../schema/auth/user');

const routes = [{
  method: 'POST',
  path: "/api/register",
  config: {
    tags: ['api'],
    description: 'Provides a token if the user authenticates successfully.',
    validate: {
      payload: UserSchema
    },
    // auth: false
  },
  handler: (request, h) => {
    return fetch(authManagerConf.uri + authManagerConf.registerPath, {
      method: 'POST',
      body: JSON.stringify(request.payload),
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
      console.log(err);
      return err;
    })
  }
}
];

exports.routes = server => server.route(routes);
