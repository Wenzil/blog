import * as JWT from 'jsonwebtoken';
import * as config from '../config';
import Account, * as AccountModel from '../models/account';
import Err from '../util/err';

const MsInSecond = 1000;
const SecondsInWeek = 60 * 60 * 24 * 7;

/**
 * Create a new user account
 *
 * @param username - The entered username
 * @param password - The entered password
 * @returns A new signed JWT token
 */
export async function signup(username: string, password: string) {
  const account = await AccountModel.create(username, password);
  const jwtPayload = toJWTPayload(account);
  return JWT.sign(jwtPayload, config.JWT_SECRET);
}

/**
 * Login a user
 *
 * @param username - The entered username
 * @param password - The entered password
 * @returns A new signed JWT token
 */
export async function login(username: string, password: string) {
  const account = await AccountModel.get(username);
  const isValidPassword = await AccountModel.isValidPassword(account, password);
  const jwtPayload = toJWTPayload(account);

  if (!isValidPassword) {
    throw new Err('Invalid password');
  } else {
    return JWT.sign(jwtPayload, config.JWT_SECRET);
  }
}

function toJWTPayload(account: Account) {
  return {
    exp: Math.floor(Date.now() / MsInSecond) + SecondsInWeek,
    sub: account.username,
    isEditor: account.isEditor
  };
}
