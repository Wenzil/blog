'use strict';

import * as hapi from 'hapi';
import * as AccountModel from '../models/account';

export function authenticate(token, request: hapi.Request, done) {
  // TODO: check token expiration in Redis
  AccountModel.get(token.accountId)
    .then(account => done(null, true, account))
    .catch(done);
}
