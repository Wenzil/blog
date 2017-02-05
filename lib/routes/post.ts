'use strict';

import * as hapi from 'hapi';
import * as Boom from 'boom';
import * as Joi from 'joi';
import * as PostController from '../controllers/post';
import Post from '../models/post';

export default [
  {
    method: 'GET',
    path: '/api/post',
    handler(_, reply: hapi.IReply) {
      PostController.getAllPosts()
        .then(reply)
        .catch(() => reply(Boom.badImplementation('Could not retrieve all posts')));
    }
  },
  {
    method: 'POST',
    path: '/api/post',
    config: {
      auth: 'jwt',
      validate: {
        payload: Joi.object()
          .keys({
            title: Joi.string()
              .min(1)
              .max(255)
              .required()
              .description('The title of the blog post'),
            contents: Joi.string()
              .min(1)
              .max(10000)
              .required()
              .description('The contents of the blog post')
          })
      }
    },
    handler(request: hapi.Request, reply: hapi.IReply) {
      const post: Post = request.payload;

      PostController.createPost(post)
        .then(reply)
        .catch(err => reply(Boom.badImplementation('Could not create new post', err)));
    }
  }
];
