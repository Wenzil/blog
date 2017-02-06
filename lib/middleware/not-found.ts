import * as Koa from 'koa';

export default async function notFound(ctx: Koa.Context) {
  ctx.throw(404);
}
