import * as Router from 'koa-router';
import * as AuthController from '../controllers/auth';
import SignupSchema from '../schemas/signup';
import LoginSchema from '../schemas/login';
import requestValidation from '../middleware/request-validation';

const router = new Router();

router.post(
  '/signup',
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
  requestValidation({ body: LoginSchema }),
  async (ctx) => {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const token = await AuthController.login(username, password);

    ctx.body = { token };
  }
);

export default router;
