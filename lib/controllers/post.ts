import Post, * as PostModel from '../models/post';
/**
 * Retrieve all editorial posts
 * @returns all editorial posts
 */
export async function getEditorialPosts() {
  return PostModel.getEditorial();
}

/**
 * Retrieve all posts of an author
 * @param author - The username of the author
 * @returns all posts of the author
 */
export async function getPostsByAuthor(author: string) {
  return PostModel.getByAuthor(author);
}

/**
 * Create a new blog post on behalf of an author
 * @param author - The username of the author
 * @param post - The data from which to create the new blog post
 * @returns The created blog post
 */
export async function createPost(author: string, post: Post) {
  return PostModel.create(author, post);
}

/**
 * Update a blog post on behalf of an author
 * @param author - The username of the author
 * @param postId - The id of the post to update
 * @param post - The data from which to update the blog post
 * @returns The updated blog post
 */
export async function updatePost(author: string, postId: number, post: Post) {
  return PostModel.update(author, postId, post);
}

/**
 * Remove a blog post on behalf of an author
 * @param author - The username of the author
 * @param postId - The id of the post to remove
 * @returns The removed blog post
 */
export async function removePost(author: string, postId: number) {
  return PostModel.remove(author, postId);
}