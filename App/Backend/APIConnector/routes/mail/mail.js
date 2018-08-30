const fetch = require('node-fetch'),
      mailManagerConf = require('../../config/APIConnector.APIs.config').MailManager,
      mailSchema = require('../../schema/mail/mail');

const routes = [
  {
    method: "POST",
    path: "/api/sendMail",
    config: {
      tags: ["api"],
      description: "Send an Email to the specified mail address with the provided subject and text",
      validate: {
        payload: mailSchema
      }
    },
    handler: (request, h) => {
      // console.log(JSON.stringify(request.payload));
      // console.log(mailManagerConf.uri + mailManagerConf.mailPath);
      // return request.payload;

      return fetch(mailManagerConf.uri + mailManagerConf.mailPath, {
        method: "POST",
        headers: {
          "Authorization": request.headers.authorization,
          // "Content-type": "application/JSON"
        },
        body: JSON.stringify(request.payload)
      })
      .then(response => {
        return response.json();
      })

      .catch(err => {
        console.log(err);
        return err;
      })
      // return request.payload;
    }
  }
]

exports.routes = server => server.route(routes);
