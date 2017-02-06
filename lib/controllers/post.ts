import Post, * as PostModel from '../models/post';

/**
 * Create a new blog post
 * @param author - The username of the author
 * @param post - The post data to from which to create a new blog post
 * @returns The created blog post
 */
export async function createPost(author: string, post: Post) {
  return PostModel.create(author, post);
}

/**
 * Retrieve all posts
 * @returns All posts
 */
export async function getAllPosts() {
  return PostModel.getAll();
}
