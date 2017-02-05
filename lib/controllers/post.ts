'use strict';

import Post, * as PostModel from '../models/post';

export async function createPost(post: Post) {
  return PostModel.create(post);
}

export async function getAllPosts() {
  return PostModel.getAll();
}
