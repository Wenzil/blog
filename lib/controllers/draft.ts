import Draft, * as DraftModel from '../models/draft';

/**
 * Retrieve all drafts of an author
 * @param author - The username of the author
 * @returns All drafts of the author
 */
export async function getDraftsByAuthor(author: string) {
  return DraftModel.getByAuthor(author);
}

/**
 * Create a new draft on behalf of an author
 * @param author - The username of the author
 * @param draft - The data from which to create the new draft
 * @returns The created draft
 */
export async function createDraft(author: string, draft: Draft) {
  return DraftModel.create(author, draft);
}

/**
 * Update a draft on behalf of an author
 * @param author - The username of the author
 * @param draftId - The id of the draft to update
 * @param draft - The data from which to update the draft
 * @returns The updated draft
 */
export async function updateDraft(author: string, draftId: number, draft: Draft) {
  return DraftModel.update(author, draftId, draft);
}

/**
 * Discard a draft on behalf of an author
 * @param author - The username of the author
 * @param draftId - The id of the draft to discard
 */
export async function discardDraft(author: string, draftId: number) {
  return DraftModel.discard(author, draftId);
}
