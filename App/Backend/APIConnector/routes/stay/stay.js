const Joi = require('joi'),
      fetch = require('node-fetch'),
      StayManagerConf = require('../../config/APIConnector.APIs.config').StayManager,
      StaySchema = require('../../schema/stay/stay');

const routes = [
  {
    method: 'GET',
    path: "/api/stay",
    config: {
      tags: ['api'],
      description: 'Provides a token if the user authenticates successfully.',
      // auth: {
      //   scope: ["User", "Admin"]
      // }
    },
    handler: (request, h) => {
      return fetch(StayManagerConf.uri + StayManagerConf.stayPath, {
        method: 'GET',
        // headers: {
        //   'Authorization': request.headers.authorization,
        // }
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
  ,{
  method: 'POST',
  path: "/api/stay",
  config: {
    tags: ['api'],
    description: 'Provides a token if the user authenticates successfully.',
    validate: {
      payload: StaySchema
    },
    // auth: {
    //   scope: ["Admin"]
    // }
  },
  handler: (request, h) => {
    return fetch(StayManagerConf.uri + StayManagerConf.stayPath, {
      method: 'POST',
      body: JSON.stringify(request.payload),
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
  method: 'GET',
  path: "/api/stay/{id}",
  config: {
    tags: ['api'],
    description: 'Provides a token if the user authenticates successfully.',
    validate: {
      params: {
        id: Joi.string().required().example('fakeid@test.com'),
      }
    },
    // auth: {
    //   scope: ["User", "Admin"]
    // }
  },
  handler: (request, h) => {
    return fetch(StayManagerConf.uri + StayManagerConf.stayPath + "/" + request.params.id, {
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
  method: 'PUT',
  path: "/api/stay/{id}",
  config: {
    tags: ['api'],
    description: 'Provides a token if the user authenticates successfully.',
    validate: {
      payload: StaySchema
    },
    // auth: {
    //   scope: ["Admin"]
    // }
  },
  handler: (request, h) => {
    return fetch(StayManagerConf.uri + StayManagerConf.stayPath + "/" + request.params.id, {
      method: 'PUT',
      body: JSON.stringify(request.payload),
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
  method: 'DELETE',
  path: "/api/stay/{id}",
  config: {
    tags: ['api'],
    description: 'Provides a token if the user authenticates successfully.',
    validate: {
      params: {
        id: Joi.string().required().example('fakeid@test.com')
      }
    },
    // auth: {
    //   scope: ["Admin"]
    // }
  },
  handler: (request, h) => {
    return fetch(StayManagerConf.uri + StayManagerConf.stayPath + "/" + request.params.id, {
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
