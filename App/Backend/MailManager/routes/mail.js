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
      return sendMail(request.payload);
      // console.log(request.payload);
      // return request.payload;


    }
  }
];
exports.routes = server => server.route(routes);
