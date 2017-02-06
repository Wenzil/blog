import * as _ from 'lodash';
import Err from '../util/err';

interface Post {
  id?: number;
  author: string;
  title: string;
  contents: string;
}

export default Post;

let internalPosts = [
  {
    id: 1,
    author: 'admin',
    title: 'Some blog post',
    contents: 'Hello world!'
  }
];

/**
 * Create a new blog post
 * @param author - The username of the author
 */
export async function create(author: string, post: Post) {
  const latestPost = _.maxBy(internalPosts, p => p.id);
  const latestPostId = latestPost ? latestPost.id : 0;
  const newPost = { ...post, id: latestPostId + 1, author };

  internalPosts.push(newPost);
  return Promise.resolve(newPost);
}

/**
 * Retrieve a blog post
 */
export async function get(id: number) {
  const post = internalPosts.find(post => post.id === id);

  if (post) {
    return Promise.resolve(post);
  } else {
    return Promise.reject(new Err('Post not found'));
  }
}

/**
 * Retrieve multiple blog posts
 */
export async function getMultiple(ids: number[]) {
  const posts = internalPosts.filter(post => _.includes(ids, post.id));
  return Promise.resolve(posts);
}

/**
 * Retrieve all blog posts
 */
export async function getAll() {
  return Promise.resolve(internalPosts);
}

/**
 * Update a blog post
 */
export async function update(id: number, post: Post) {
  const existingPost = internalPosts.find(p => p.id === id);

  if (existingPost) {
    const index = internalPosts.indexOf(existingPost);
    const updatedPost = { ...existingPost, ...post, author: existingPost.author, id: existingPost.id };
    internalPosts[index] = updatedPost;
    return Promise.resolve(updatedPost);
  } else {
    return Promise.reject(new Err('Post not found'));
  }
}

/**
 * Remove a blog post
 */
export async function remove(id: number) {
  const post = internalPosts.find(post => post.id === id);

  if (post) {
    internalPosts = internalPosts.filter(p => p.id !== id);
    return Promise.resolve(post);
  } else {
    return Promise.reject(new Err('Post not found'));
  }
}
