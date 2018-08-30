const Joi = require('joi');
const fetch = require('node-fetch');
const authManagerConf = require('../../config/APIConnector.APIs.config').AuthManager;

const AuthSchema = require('../../schema/auth/auth');

const routes = [{
  method: 'POST',
  path: "/api/auth",
  config: {
    tags: ['api'],
    description: 'Provides a token if the user authenticates successfully.',
    validate: {
      payload: AuthSchema
    },
    // auth: false
  },
  handler: (request, h) => {
    return fetch(authManagerConf.uri + authManagerConf.authPath, {
      method: 'POST',
      body: JSON.stringify(request.payload),
    })
    .then(response => {
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
