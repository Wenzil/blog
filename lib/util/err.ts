export type ErrorCode = 'Invalid password'
  | 'Account not found'
  | 'Account already exists'
  | 'Post not found';

export default class Err extends Error {
  public code: ErrorCode;

  constructor(code: ErrorCode) {
    super(code);
    this.code = code;
  }
}
