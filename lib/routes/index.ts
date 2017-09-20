import * as Router from 'koa-router';
import authRouter from './auth';
import postRouter from './post';
import draftRouter from './draft';
import mediaRouter from './media';

const router = new Router();

router.use('/api', authRouter.routes());
router.use('/api', postRouter.routes());
router.use('/api', draftRouter.routes());
router.use('/api', mediaRouter.routes());

export default router;