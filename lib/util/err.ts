export type ErrorCode = 'Invalid password'
  | 'Account not found'
  | 'Account already exists'
  | 'Post not found'
  | 'Draft not found'
  | 'Unmet password requirements'
  | 'Forbidden access';

export default class Err extends Error {
  public code: ErrorCode;

  constructor(code: ErrorCode, description: string = null) {
    const message = description
      ? `${code}: ${description}`
      : code;
    super(message);
    this.code = code;
  }
}
