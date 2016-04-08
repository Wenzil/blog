'use strict';

import * as JWT from 'jsonwebtoken';
import * as config from '../config';
import * as AccountModel from '../models/account';

export async function generateToken(accountId) {
  const account = await AccountModel.get(accountId);

  return JWT.sign(account, config.JWT_SECRET);
}
