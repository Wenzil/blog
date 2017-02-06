import * as Router from 'koa-router';
import * as jwt from 'koa-jwt';

import * as config from '../config';
import * as PostController from '../controllers/post';
import Post from '../models/post';
import PostSchema from '../schemas/post';
import requestValidation from '../middleware/request-validation';

const router = new Router();

router.get(
  '/',
  async (ctx) => {
    const posts = await PostController.getAllPosts();
    ctx.body = posts;
  }
);

router.post(
  '/',
  jwt({ secret: config.JWT_SECRET }),
  requestValidation({ body: PostSchema }),
  async (ctx) => {
    const author = ctx.state.user.sub;
    const post: Post = ctx.request.body;
    const createdPost = await PostController.createPost(author, post);
    ctx.body = createdPost;
  }
);

// TODO: Implement update own post route

export default router;
