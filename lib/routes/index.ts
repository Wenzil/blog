import * as Router from 'koa-router';
import authRouter from './auth';
import postRouter from './post';
const router = new Router();

router.use('/api/auth', authRouter.routes());
router.use('/api/post', postRouter.routes());

export default router;