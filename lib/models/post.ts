import * as _ from 'lodash';
import Err from '../util/err';

interface Post {
  id?: number;
  author: string;
  isEditorial: boolean;
  timestamp: number;
  title: string;
  body: string;
}

export default Post;

let internalPosts = [
  {
    id: 1,
    author: 'admin',
    isEditorial: true,
    timestamp: Date.now(),
    title: 'Some blog post',
    body: 'Hello world!'
  }
];

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
 * Retrieve all editorial blog posts
 */
export async function getEditorial() {
  return Promise.resolve(internalPosts.filter(p => p.isEditorial));
}

/**
 * Retrieve all blog posts of an author
 */
export async function getByAuthor(author) {
  return Promise.resolve(internalPosts.filter(p => p.author === author));
}

/**
 * Create a new blog post on behalf of an author
 * @param author - The username of the author
 * @param post - The data from which to create the new blog post
 */
export async function create(author: string, post: Post) {
  const latestPost = _.maxBy(internalPosts, p => p.id);
  const latestPostId = latestPost ? latestPost.id : 0;
  const newPost = { ...post, id: latestPostId + 1, author };

  internalPosts.push(newPost);
  return Promise.resolve(newPost);
}

/**
 * Update a blog post on behalf of an author
 */
export async function update(author: string, id: number, post: Post) {
  const existingPost = internalPosts.find(p => p.id === id);

  if (!existingPost) {
    return Promise.reject(new Err('Post not found'));
  } else if (existingPost.author !== author) {
    return Promise.reject(new Err('Forbidden access'));
  } else {
    const index = internalPosts.indexOf(existingPost);
    const updatedPost = { ...existingPost, ...post };
    internalPosts[index] = updatedPost;
    return Promise.resolve(updatedPost);
  }
}

/**
 * Remove a blog post on behalf of an author
 */
export async function remove(author: string, id: number) {
  const post = internalPosts.find(post => post.id === id);

  if (!post) {
    return Promise.reject(new Err('Post not found'));
  } else if (post.author !== author) {
    return Promise.reject(new Err('Forbidden access'));
  } else {
    internalPosts = internalPosts.filter(p => p.id !== id);
    return Promise.resolve(post);
  }
}
