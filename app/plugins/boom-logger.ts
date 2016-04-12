'use strict';

import * as hapi from 'hapi';

function logBoomError(request: hapi.Request, reply: hapi.IReply) {
  if (request.response.isBoom) {
    let err = request.response['output'];
    let formattedUrl = `${request.method.toUpperCase()} ${request.url.path}`;
    let formattedCredentials = request.auth.credentials ? `\nAccount Id: ${request.auth.credentials.id}` : '';
    let formattedRequestPayload = request.payload
      ? `\nRequest Payload: ${JSON.stringify(request.payload, null, 2)}`
      : '';
    let formattedErrorMessage = `\n${err.payload.message}` || '';
    let formattedError =
      `${formattedUrl} (${err.statusCode}) ${err.payload.error}${formattedErrorMessage}${formattedCredentials}${formattedRequestPayload}`;

    if (err.statusCode >= 500) {
      console.error(formattedError);
    } else {
      console.warn(formattedError);
    }
    reply.continue();
  } else {
    reply.continue();
  }
};

function register(server: hapi.Server, options, done) {
  server.ext('onPreResponse', logBoomError);
  done();
}

export default {
  register: Object.assign(register, {
     attributes: {
       name: 'boom-logger',
       version : '0.1.0',
     },
   }),
};

