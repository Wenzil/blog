import * as Koa from 'koa';

export default async function contentNegotiation(ctx: Koa.Context, next: () => Promise<any>) {
  if (ctx.get('Content-Length') && !ctx.is('application/json')) {
    ctx.throw(415);
  } else if (!ctx.accepts('application/json')) {
    ctx.throw(406);
  } else {
    await next();
    ctx.type = 'application/json';
    ctx.body = ctx.body || {};
  }
}
