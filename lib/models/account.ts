import Err from '../util/err';
import {generateHash} from '../util/crypto';

interface Account {
  username: string;
  hash: string;
  salt: string;
  isEditor: boolean;
}
export default Account;

let internalAccounts: Account[] = [];

/**
 * Create a new user account
 */
export async function create(username: string, password: string, isEditor = false) {
  const existingAccount = internalAccounts.find(acc => acc.username === username);

  if (existingAccount) {
    return Promise.reject<Account>(new Err('Account already exists'));
  } else {
    const { hash, salt } = await generateHash(password);
    const account = { username, hash, salt, isEditor };

    internalAccounts.push(account);
    return Promise.resolve(account);
  }
}

/**
 * Retrieve a user account by username
 */
export async function get(username: string) {
  const account = internalAccounts.find(acc => acc.username === username);

  if (!account) {
    return Promise.reject<Account>(new Err('Account not found'));
  } else {
    return Promise.resolve(account);
  }
}

/**
 * Retrieve all user accounts
 */
export async function getAll() {
  return Promise.resolve(internalAccounts);
}

/**
 * Remove a user account by username
 */
export async function remove(username: string) {
  const account = internalAccounts.find(acc => acc.username === username);

  if (!account) {
    return Promise.reject(new Err('Account not found'));
  } else {
    internalAccounts = internalAccounts.filter(acc => acc.username !== username);
    return Promise.resolve(account);
  }
}

/**
 * Update a user account by username
 */
export async function update(username: string, account: Account) {
  const existingAccount = internalAccounts.find(acc => acc.username === username);

  if (!existingAccount) {
    return Promise.reject<Account>(new Err('Account not found'));
  } else {
    Object.assign(existingAccount, { ...account, username });
    return Promise.resolve(Object.assign(account));
  }
}

/**
 * Indicate whether a given password matches the password of the account
 *
 * @param account - The account to check the password against
 * @param password - The password to check
 * @returns Whether the password is matches the password of the account
 */
export async function isValidPassword(account: Account, password) {
  const { hash } = await generateHash(password, account.salt);
  return account.hash === hash;
}
