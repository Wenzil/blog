import * as Router from 'koa-router';
import * as AuthController from '../controllers/auth';
import SignupSchema from '../schemas/signup';
import LoginSchema from '../schemas/login';
import requestValidation from '../middleware/request-validation';
import contentTypeValidation from '../middleware/content-type-validation';

const router = new Router({ prefix: '/auth' });

router.post(
  '/signup',
  contentTypeValidation('application/json'),
  requestValidation({ body: SignupSchema }),
  async (ctx) => {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const token = await AuthController.signup(username, password);

    ctx.body = { token };
  }
);

router.post(
  '/login',
  contentTypeValidation('application/json'),
  requestValidation({ body: LoginSchema }),
  async (ctx) => {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const token = await AuthController.login(username, password);

    ctx.body = { token };
  }
);

export default router;
