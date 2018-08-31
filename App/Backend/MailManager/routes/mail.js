const Boom = require('boom');

const mailSchema = require('../mail/schema')

const sendMail = require('../mail/functions/sendMail');

const routes =
[
  {
    method: "POST",
    path: "/sendMail",
    config: {
      tags: ["api"],
      description: "Send an Email to the specified mail address with the provided subject and text",
      validate: {
        payload: mailSchema
      },
      auth: {
        scope: ["SuperAdmin", "Admin", "User"]
      }
    },
    handler: (request, h) => {
      if(sendMail(request.payload)) {
        return h.code(204);
      }

      return Boom.badImplementation("An internal error occured");
    }
  }
];
exports.routes = server => server.route(routes);
