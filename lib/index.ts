import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';

import * as config from './config';
import * as errorLogger from './util/error-logger';
import errorHandler from './middleware/error-handler';
import contentNegotiation from './middleware/content-negotation';
import notFound from './middleware/not-found';
import router from './routes';

export const app = new Koa();

app
  .use(errorHandler)
  .use(contentNegotiation)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(notFound);

app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`));

app.on('error', (err, ctx: Koa.Context) => {
  errorLogger.logError(err, ctx);
});

process.on('uncaughtException', err => {
  console.error(err);
});
