import * as Router from 'koa-router';

export default function (...types: string[]) {
  return async (ctx: Router.IRouterContext, next: () => Promise<any>) => {
    if (ctx.get('Content-Length') && !ctx.is(types)) {
      ctx.throw(415);
    } else {
      await next();
    }
  };
}