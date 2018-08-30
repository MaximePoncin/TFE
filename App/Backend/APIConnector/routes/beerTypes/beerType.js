const Joi = require('joi'),
      fetch = require('node-fetch'),
      beerTypeManagerConf = require('../../config/APIConnector.APIs.config').BeerTypeManager,
      BeerTypeSchema = require('../../schema/beerType/beerType');

const routes = [
  {
    method: 'GET',
    path: "/api/beerType",
    config: {
      tags: ['api'],
      description: 'Provides a token if the user authenticates successfully.',
      // auth: {
      //   scope: ["User", "Admin"]
      // }
    },
    handler: (request, h) => {
      return fetch(beerTypeManagerConf.uri + beerTypeManagerConf.beerTypePath, {
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
  }
  ,{
  method: 'POST',
  path: "/api/beerType",
  config: {
    tags: ['api'],
    description: 'Provides a token if the user authenticates successfully.',
    validate: {
      payload: BeerTypeSchema
    },
    // auth: {
    //   scope: ["Admin"]
    // }
  },
  handler: (request, h) => {
    return fetch(beerTypeManagerConf.uri + beerTypeManagerConf.beerTypePath, {
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
  path: "/api/beerType/{id}",
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
    return fetch(beerTypeManagerConf.uri + beerTypeManagerConf.beerTypePath + "/" + request.params.id, {
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
  path: "/api/beerType/{id}",
  config: {
    tags: ['api'],
    description: 'Provides a token if the user authenticates successfully.',
    validate: {
      payload: BeerTypeSchema
    },
    // auth: {
    //   scope: ["Admin"]
    // }
  },
  handler: (request, h) => {
    return fetch(beerTypeManagerConf.uri + beerTypeManagerConf.beerTypePath + "/" + request.params.id, {
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
  path: "/api/beerType/{id}",
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
    return fetch(beerTypeManagerConf.uri + beerTypeManagerConf.beerTypePath, {
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
},{
  method: "POST",
  path: "/api/beerType/getMany",
  config: {
    tags: ['api'],
    description: "Get the specified activities in payload",
    validate: {
      payload: {
        ids: Joi.array().items(Joi.string().required())
      }
    }
  },
  handler: (request, h) => {
    return fetch(beerTypeManagerConf.uri + beerTypeManagerConf.beerTypePath + "/getMany", {
      method: "POST",
      headers: {
        'Authorization': request.headers.authorization,
      },
      body: JSON.stringify(request.payload)
    })
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error ("An error occured while fetching beertypes")
      }
    })
    .catch(err => {
      console.log(err);
      return err;
    })
  }
}
];

exports.routes = server => server.route(routes);
