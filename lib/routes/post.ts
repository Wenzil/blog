import * as Router from 'koa-router';
import * as jwt from 'koa-jwt';
import * as Joi from 'joi';

import * as config from '../config';
import * as PostController from '../controllers/post';
import Post from '../models/post';
import DraftSchema from '../schemas/post';
import requestValidation from '../middleware/request-validation';

const router = new Router();

router.get(
  '/me/post',
  jwt({ secret: config.JWT_SECRET }),
  async (ctx) => {
    const author = ctx.state.user.sub;
    const posts = await PostController.getPostsByAuthor(author);
    ctx.body = posts;
  }
);

router.post(
  '/me/post',
  jwt({ secret: config.JWT_SECRET }),
  requestValidation({ body: DraftSchema }),
  async (ctx) => {
    const author = ctx.state.user.sub;
    const isEditor = ctx.state.user.isEditor;
    const post: Post = {
      isEditorial: isEditor,
      timestamp: Date.now(),
      ...ctx.request.body
    };
    const createdPost = await PostController.createPost(author, post);
    ctx.body = createdPost;
  }
);

router.put(
  '/me/post/:postId',
  jwt({ secret: config.JWT_SECRET }),
  requestValidation({
    params: { postId: Joi.number() },
    body: DraftSchema
  }),
  async (ctx) => {
    const author = ctx.state.user.sub;
    const isEditor = ctx.state.user.isEditor;
    const postId = ctx.params.postId;
    const post: Post = {
      isEditorial: isEditor,
      timestamp: Date.now(),
      ...ctx.request.body
    };
    const updatedPost = await PostController.updatePost(author, postId, post);
    ctx.body = updatedPost;
  }
);

router.delete(
  '/me/post/:postId',
  jwt({ secret: config.JWT_SECRET }),
  requestValidation({
    params: { postId: Joi.number() }
  }),
  async (ctx) => {
    const author = ctx.state.user.sub;
    const postId = ctx.params.postId;
    const removedPost = await PostController.removePost(author, postId);
    ctx.body = removedPost;
  }
);

router.get(
  '/author/:author/post',
  async (ctx) => {
    const author = ctx.params.author;
    const posts = await PostController.getPostsByAuthor(author);
    ctx.body = posts;
  }
);

// TODO: Support filtering by author, editorial and tags
router.get(
  '/post',
  async (ctx) => {
    const posts = await PostController.getEditorialPosts();
    ctx.body = posts;
  }
);

export default router;
