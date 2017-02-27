import * as Joi from 'joi';
import * as Router from 'koa-router';

interface Options {
  params?: Object | Joi.Schema;
  query?: Object | Joi.Schema;
  body?: Object | Joi.Schema;
}

export default function (options: Options) {
  return validateRequest.bind(null, options);
}

async function validateRequest(options: Options, ctx: Router.IRouterContext, next: () => Promise<any>) {
  if (options.params) {
    validate(ctx.params, options.params, ctx);
  }
  if (options.query) {
    validate(ctx.request.query, options.query, ctx);
  }
  if (options.body) {
    validate(ctx.request.body, options.body, ctx);
  }
  await next();
};

function validate(data: Object, schema: Object | Joi.Schema, ctx: Router.IRouterContext) {
  const validation = Joi.validate(data, schema);
  if (validation.error) {
    ctx.throw(validation.error.message, 400);
  } else {
    Object.assign(data, validation.value);
  }
}