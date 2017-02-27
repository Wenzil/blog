import * as Koa from 'koa';
import {ErrorCode} from '../util/err';

const statusByErrorCode: { [E in ErrorCode]: number } = {
  'Unmet password requirements': 400,
  'Invalid password': 401,
  'Forbidden access': 403,
  'Account not found': 404,
  'Post not found': 404,
  'Draft not found': 404,
  'Account already exists': 409
};

export default async function errorHandler(ctx: Koa.Context, next: () => Promise<any>) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.code in statusByErrorCode
      ? statusByErrorCode[err.code]
      : err.status || 500;
    ctx.type = 'application/json';
    ctx.body = {
      code: err.code || ctx.status,
      message: err.message
    };

    ctx.app.emit('error', err, ctx);
  }
}
