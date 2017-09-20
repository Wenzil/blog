import * as Router from 'koa-router';

export default function (maxContentLength) {
  return async (ctx: Router.IRouterContext, next: () => Promise<any>) => {
    if (ctx.get('Content-Length') > maxContentLength) {
      ctx.throw(413);
    } else {
      await next();
    }
  };
}