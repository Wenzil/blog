import * as _ from 'lodash';
import Err from '../util/err';

interface Post {
  id?: number;
  title: string;
  contents: string;
}

export default Post;

let internalPosts = [
  {
    id: 1,
    title: 'Some blog post',
    contents: 'Hello world!'
  }
];

/**
 * Create a new blog post
 */
export async function create(post: Post) {
  const latestPost = _.maxBy(internalPosts, p => p.id);
  const latestPostId = latestPost ? latestPost.id : 0;
  const newPost = Object.assign({ id: 0 }, post, { id: latestPostId + 1 });

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
    const updatedPost = Object.assign({}, existingPost, post);
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
