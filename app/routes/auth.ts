'use strict';

import * as hapi from 'hapi';
import * as Boom from 'boom';
import * as Joi from 'joi';
import * as AuthController from '../controllers/auth';
import Err from '../lib/err';

const routes: hapi.IRouteConfiguration[] = [
  {
    method: 'POST',
    path: '/login',
    config: {
      validate: {
        payload: Joi.object()
          .keys({
            username: Joi.string()
              .required()
              .description('The username of the account to login'),
            password: Joi.string()
              .required()
              .description('The password of the account to login')
          })
      }
    },
    handler(request: hapi.Request, reply: hapi.IReply) {
      const username = request.payload['username'];
      const password = request.payload['password'];

      AuthController.login(username, password)
        .then(token => reply({ token }))
        .catch((err: Err) => {
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
    config: {
      validate: {
        payload: Joi.object()
          .keys({
            username: Joi.string()
              .alphanum()
              .min(3)
              .max(18)
              .required()
              .description('The username of the account to create'),
            password: Joi.string()
              .min(8)
              .max(256)
              .regex(/(?=^.{8,36}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
              .required()
              .description('The password of the account to create' +
                '- The password length must be greater than or equal to 8' +
                '- The password must contain one or more uppercase characters' +
                '- The password must contain one or more lowercase characters' +
                '- The password must contain one or more numeric values' +
                '- The password must contain one or more special characters'),
            password_confirmation: Joi.string()
              .required()
              .description('The password confirmation')
          })
      }
    },
    handler(request: hapi.Request, reply: hapi.IReply) {
      const username = request.payload['username'];
      const password = request.payload['password'];
      const passwordConfirmation = request.payload['password_confirmation'];

      AuthController.createAccount(username, password, passwordConfirmation)
        .then(token => reply({ token }))
        .catch((err: Err) => {
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
];

export default routes;
