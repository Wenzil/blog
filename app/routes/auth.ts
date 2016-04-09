'use strict';

import * as hapi from 'hapi';
import * as AuthController from '../controllers/auth';

export default [
  {
    method: 'POST',
    path: '/login',
    handler: function(request: hapi.Request, reply: hapi.IReply) {
      const accountId = request.payload['account_id'];

      AuthController.generateToken(accountId)
        .then(token => reply({ token}))
        .catch(function(err) {
          reply(Boom.badImplementation('Could not login', err));
        });
    },
  },
]
