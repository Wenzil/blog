import * as _ from 'lodash';
import Err from '../util/err';

interface Draft {
  id?: number;
  postId?: string;
  author: string;
  title: string;
  body: string;
}

export default Draft;

let internalDrafts = [];

/**
 * Retrieve all drafts of an author
 */
export async function getByAuthor(author) {
  return Promise.resolve(internalDrafts.filter(d => d.author === author));
}

/**
 * Create a new draft on behalf of an author
 * @param author - The username of the author
 * @param draft - The data from which to create the new draft
 */
export async function create(author: string, draft: Draft) {
  const latestDraft = _.maxBy(internalDrafts, d => d.id);
  const latestDraftId = latestDraft ? latestDraft.id : 0;
  const newDraft = { ...draft, id: latestDraftId + 1, author };

  internalDrafts.push(newDraft);
  return Promise.resolve(newDraft);
}

/**
 * Update a draft on behalf of an author
 */
export async function update(author: string, id: number, draft: Draft) {
  const existingDraft = internalDrafts.find(d => d.id === id);

  if (!existingDraft) {
    return Promise.reject(new Err('Draft not found'));
  } else if (existingDraft.author !== author) {
    return Promise.reject(new Err('Forbidden access'));
  } else {
    const index = internalDrafts.indexOf(existingDraft);
    const updatedDraft = { ...existingDraft, ...draft };
    internalDrafts[index] = updatedDraft;
    return Promise.resolve(updatedDraft);
  }
}

/**
 * Discard a draft on behalf of an author
 */
export async function discard(author: string, id: number) {
  const draft = internalDrafts.find(draft => draft.id === id);

  if (!draft) {
    return Promise.reject(new Err('Draft not found'));
  } else if (draft.author !== author) {
    return Promise.reject(new Err('Forbidden access'));
  } else {
    internalDrafts = internalDrafts.filter(d => d.id !== id);
    return Promise.resolve(draft);
  }
}
