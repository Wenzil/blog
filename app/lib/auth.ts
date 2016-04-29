'use strict';

import * as crypto from 'crypto';
import * as async from 'async';
import * as hapi from 'hapi';
import * as AccountModel from '../models/account';
import Err from './err';

export function authenticate(token, request: hapi.Request, done) {
  // TODO: validate existence of and touch the token in Redis
  done(null, true, token);
}

export async function validateCredentials(username: string, password) {
  const account = await AccountModel.tryGet(username);

  if (!account) {
    throw new Err('Invalid Credentials');
  }

  const hashAndSalt = await generateHash(password, account.salt);

  if (account.hash !== hashAndSalt.hash) {
    throw new Err('Invalid Credentials');
  } else {
    return account;
  }
}

export async function generateHash(password: string, salt?: string) {
  return new Promise<{ hash: string, salt: string }>(function(resolve, reject) {
    async.seq(
      function(a, next) {
        crypto.randomBytes(128, next);
      },
      function(bytes, next) {
        salt = salt || new Buffer(bytes).toString('hex')
        crypto.pbkdf2(password, salt, 7000, 256, next);
      }
    )(null, (err, bytes) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          hash: new Buffer(bytes).toString('hex'),
          salt
        });
      }
    });
  });
}
