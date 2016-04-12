'use strict';

import * as JWT from 'jsonwebtoken';
import * as config from '../config';
import * as AccountModel from '../models/account';
import * as auth from '../lib/auth';
import Err from '../lib/err';

export async function createAccount(username: string, password: string, passwordConfirmation: string) {
  if (password !== passwordConfirmation) {
    throw new Err('Password does not match confirmation');
  }

  const hashAndSalt = await auth.generateHash(password);
  const accountData = Object.assign({ username }, hashAndSalt);
  const account = await AccountModel.create(accountData);

  return JWT.sign(account, config.JWT_SECRET);
}

export async function login(username: string, password: string) {
  const account = await auth.validateCredentials(username, password);
  return JWT.sign(account, config.JWT_SECRET);
}
