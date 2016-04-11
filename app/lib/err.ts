'use strict';

export type Type = 'Invalid Credentials'
  | 'Account not found'
  | 'Account already exists'
  | 'Password does not match confirmation';

export default class Err extends Error {
  public type: Type;

  constructor(type: Type, message?: string) {
    super(message || type);
    this.type = type;
  }
}
