const Joi = require('joi'),
      fetch = require('node-fetch'),
      StayManagerConf = require('../../config/APIConnector.APIs.config').StayManager,
      ActivitySchema = require('../../schema/stay/activity');

const routes =
 [
  {
    method: 'GET',
    path: '/api/activity',
    config: {
      tags: ['api'],
      description: "Get all activities in storage",
      // auth: {
      //   scope: ["Admin", "User"]
      // }
    },
    handler: (request, h) => {
      return fetch(StayManagerConf.uri + StayManagerConf.activityPath, {
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
    path: '/api/activity',
    config: {
      tags: ['api'],
      description: "Save a activity in storage",
      validate: {
        payload: ActivitySchema
      },
      // auth: {
      //   scope: ["Admin"]
      // }
    },
    handler: (request, h) => {
      return fetch(StayManagerConf.uri + StayManagerConf.activityPath, {
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
    path: '/api/activity/{id}',
    config: {
      tags: ['api'],
      description: "Get a specific activity",
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
      return fetch(StayManagerConf.uri + StayManagerConf.activityPath + "/" + request.params.id, {
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
    path: '/api/activity/{id}',
    config: {
      tags: ['api'],
      description: "Update a specific activity",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: ActivitySchema
      },
      // auth: {
      //   scope: ["Admin"]
      // }
    },
    handler: (request, h) => {
      return fetch(StayManagerConf.uri + StayManagerConf.activityPath + "/" + request.params.id, {
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
    path: '/api/activity/{id}',
    config: {
      tags: ['api'],
      description: "Delete a specific activity",
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
      return fetch(StayManagerConf.uri + StayManagerConf.activityPath + "/" + request.params.id, {
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
    path: "/api/activity/getMany",
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
      console.log(JSON.stringify(request.payload));
      return fetch(StayManagerConf.uri + StayManagerConf.activityPath + "/getMany", {
        method: "POST",
        headers: {
          'Authorization': request.headers.authorization,
        },
        body: JSON.stringify(request.payload)
      })
      .then(response => {
        return response.json();
      })
      .then(jsonPromise => {
        console.log(jsonPromise);
        return jsonPromise;
      })
      .catch(err => {
        return err;
      })
    }
  }
];

exports.routes = server => server.route(routes);
