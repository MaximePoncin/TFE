const Joi = require('joi'),
      fetch = require('node-fetch'),
      AuthManagerConf = require('../../config/APIConnector.APIs.config').AuthManager,
      UserSchema = require('../../schema/auth/user');

const routes =
 [
  {
    method: 'GET',
    path: '/api/user',
    config: {
      tags: ['api'],
      description: "Get all users in storage",
      // auth: {
      //   scope: ["Admin", "User"]
      // }
    },
    handler: (request, h) => {
      return fetch(AuthManagerConf.uri + AuthManagerConf.userPath, {
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
    path: '/api/user',
    config: {
      tags: ['api'],
      description: "Save a user in storage",
      validate: {
        payload: UserSchema
      },
      // auth: {
      //   scope: ["Admin"]
      // }
    },
    handler: (request, h) => {
      return fetch(AuthManagerConf.uri + AuthManagerConf.userPath, {
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
    path: '/api/user/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific user",
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
      return fetch(AuthManagerConf.uri + AuthManagerConf.userPath + "/" + request.params.id, {
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
    method: 'GET',
    path: '/api/userByMail/{mail}',
    config: {
      tags: ['api'],
      description: "Get a specific user",
      validate: {
        params: {
          mail: Joi.string().email().required()
        }
      },
      // auth: {
      //   scope: ["Admin", "User"]
      // }
    },
    handler: (request, h) => {
      return fetch(AuthManagerConf.uri + AuthManagerConf.userByMailPath + "/" + request.params.mail, {
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
    path: '/api/user/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific user",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: UserSchema
      },
      // auth: {
      //   scope: ["Admin"]
      // }
    },
    handler: (request, h) => {
      return fetch(AuthManagerConf.uri + AuthManagerConf.userPath + "/" + request.params.id, {
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
    path: '/api/user/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific user",
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
      return fetch(AuthManagerConf.uri + AuthManagerConf.userPath + "/" + request.params.id, {
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
