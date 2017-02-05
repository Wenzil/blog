'use strict';

import * as JWT from 'jsonwebtoken';
import * as config from '../config';
import * as AccountModel from '../models/account';
import Err from '../util/err';

/**
 * Create a new user account
 *
 * @param   username  The entered username
 * @param   password  The entered password
 * @returns           A new signed JWT token
 */
export async function createAccount(username: string, password: string) {
  const account = await AccountModel.create(username, password);

  return JWT.sign(account, config.JWT_SECRET);
}

/**
 * Login a user
 *
 * @param   username  The entered username
 * @param   password  The entered password
 * @returns           A new signed JWT token
 */
export async function login(username: string, password: string) {
  const account = await AccountModel.tryGet(username);
  const isValidPassword = await AccountModel.isValidPassword(account, password);

  if (!isValidPassword) {
    throw new Err('Invalid Credentials');
  } else {
    return JWT.sign(account, config.JWT_SECRET);
  }
}
