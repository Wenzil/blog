import * as _ from 'lodash';

export default class Account {
  constructor(data) {
    this.id = data.id;
    this.userName = data.userName;
  }

  public id: number;
  public userName: string;
}

const internalAccount = new Account({
  id: 1,
  userName: 'SomeUserName',
});

export async function create(account: Account) {
  return Promise.resolve(Object.assign(account, { id: 2 }));
}

export async function get(id: number) {
  return Promise.resolve(internalAccount);
}

export async function getAll() {
  return Promise.resolve([internalAccount]);
}

export async function remove(id: number) {
  return Promise.resolve();
}

export async function update(id: number, account: Account) {
  return Promise.resolve(account);
}
