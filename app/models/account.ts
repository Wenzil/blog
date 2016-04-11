import * as _ from 'lodash';
import Err from '../lib/err';

export default class Account {
  constructor(data) {
    this.username = data.username;
    this.hash = data.hash;
    this.salt = data.salt;
  }

  public username: string;
  public hash: string;
  public salt: string;
}

const internalAccounts: Account[] = [];

export async function create(account: Account) {
  const existingAccount = internalAccounts.find(acc => acc.username === account.username);

  if (existingAccount) {
    return Promise.reject<Account>(new Err('Account already exists'));
  } else {
    internalAccounts.push(account);
    return Promise.resolve(account);
  }
}

export async function get(username: string) {
  const account = internalAccounts.find(acc => acc.username === username);

  if (!account) {
    return Promise.reject<Account>(new Err('Account not found'));
  } else {
    return Promise.resolve(account);
  }
}

export async function tryGet(username: string) {
  const account = internalAccounts.find(acc => acc.username === username);

  if (!account) {
    return Promise.resolve<Account>(null);
  } else {
    return Promise.resolve(account);
  }
}

export async function getAll() {
  return Promise.resolve(internalAccounts);
}

export async function remove(username: string) {
  const account = internalAccounts.find(acc => acc.username === username);

  if (!account) {
    return Promise.reject(new Err('Account not found'));
  } else {
    return Promise.resolve();
  }
}

export async function update(username: string, account: Account) {
  const existingAccount = internalAccounts.find(acc => acc.username === username);

  if (!existingAccount) {
    return Promise.reject<Account>(new Err('Account not found'));
  } else {
    Object.assign(existingAccount, account);
    return Promise.resolve(Object.assign(account, { username }));
  }
}
