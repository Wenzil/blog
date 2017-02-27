import * as Router from 'koa-router';
import * as jwt from 'koa-jwt';
import * as Joi from 'joi';

import * as config from '../config';
import * as DraftController from '../controllers/draft';
import Draft from '../models/draft';
import DraftSchema from '../schemas/draft';
import requestValidation from '../middleware/request-validation';

const router = new Router();

router.get(
  '/me/draft',
  jwt({ secret: config.JWT_SECRET }),
  async (ctx) => {
    const author = ctx.state.user.sub;
    const drafts = await DraftController.getDraftsByAuthor(author);
    ctx.body = drafts;
  }
);

router.post(
  '/me/draft',
  jwt({ secret: config.JWT_SECRET }),
  requestValidation({ body: DraftSchema }),
  async (ctx) => {
    const author = ctx.state.user.sub;
    const draft: Draft = {
      timestamp: Date.now(),
      ...ctx.request.body
    };
    const createdPost = await DraftController.createDraft(author, draft);
    ctx.body = createdPost;
  }
);

router.put(
  '/me/draft/:draftId',
  jwt({ secret: config.JWT_SECRET }),
  requestValidation({
    params: { draftId: Joi.number() },
    body: DraftSchema
  }),
  async (ctx) => {
    const author = ctx.state.user.sub;
    const draftId = ctx.params.draftId;
    const draft: Draft = {
      timestamp: Date.now(),
      ...ctx.request.body
    };
    const updatedPost = await DraftController.updateDraft(author, draftId, draft);
    ctx.body = updatedPost;
  }
);

router.delete(
  '/me/draft/:draftId',
  jwt({ secret: config.JWT_SECRET }),
  requestValidation({
    params: { draftId: Joi.number() }
  }),
  async (ctx) => {
    const author = ctx.state.user.sub;
    const draftId = ctx.params.draftId;
    const discardedDraft = await DraftController.discardDraft(author, draftId);
    ctx.body = discardedDraft;
  }
);

export default router;
