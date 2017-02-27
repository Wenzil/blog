import * as Router from 'koa-router';
import authRouter from './auth';
import postRouter from './post';
import draftRouter from './draft';
const router = new Router();

router.use('/api/auth', authRouter.routes());
router.use('/api', postRouter.routes());
router.use('/api', draftRouter.routes());

export default router;