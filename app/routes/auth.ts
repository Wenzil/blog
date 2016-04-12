'use strict';

import * as hapi from 'hapi';
import * as Boom from 'boom';
import * as AuthController from '../controllers/auth';
import Err from '../lib/err';

export default [
  {
    method: 'POST',
    path: '/login',
    handler: function(request: hapi.Request, reply: hapi.IReply) {
      const username = request.payload['username'];
      const password = request.payload['password'];

      AuthController.login(username, password)
        .then(token => reply({ token }))
        .catch(function(err: Err) {
          switch (err.type) {
            case 'Invalid Credentials':
              reply(Boom.unauthorized(err.message));
              break;

            default:
              reply(Boom.badImplementation('Could not login', err));
          }
        });
    },
  },
  {
    method: 'POST',
    path: '/signup',
    handler: function(request: hapi.Request, reply: hapi.IReply) {
      const username = request.payload['username'];
      const password = request.payload['password'];
      const passwordConfirmation = request.payload['password_confirmation'];

      AuthController.createAccount(username, password, passwordConfirmation)
        .then(token => reply({ token }))
        .catch(function(err: Err) {
          switch (err.type) {
            case 'Account already exists':
              reply(Boom.conflict(err.message));
              break;

            case 'Password does not match confirmation':
              reply(Boom.badData(err.message));
              break;

            default:
              reply(Boom.badImplementation('Could not signup', err));
          }
        });
    },
  },
]
