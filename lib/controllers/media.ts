import * as MediaModel from '../models/media';

// TODO: Finish implementing and test this method
/**
 * Retrieve all images uploaded by a user
 * @param uploader - The username of the uploader
 * @returns All images uploaded by the user
 */
export async function getImagesByUploader(uploader: string) {
  return uploader && [];
}

// TODO: Finish implementing and test this method
/**
 * Add and upload an image on behalf of a user
 * @param uploader - The username of the uploader
 * @param sourceStream - The image data stream
 * @param timestamp - The timestamp of the upload
 * @returns The added and uploaded image
 */
export async function addImage(uploader: string, sourceStream: NodeJS.ReadableStream, timestamp: number) {
  return await MediaModel.add(uploader, sourceStream, timestamp);
}

// TODO: Finish implementing and test this method
/**
 * Update the metadata of an uploaded image on behalf of the uploader
 * @param uploader - The username of the uploader
 * @param imageId - The id of the post to update
 * @param metaData - The meta data from which to update the uploaded image
 * @returns The updated image
 */
export async function updateImageMetaData(uploader: string, imageId: number, metaData: { name: string }) {
  return {
    id: imageId,
    uploader,
    contentType: 'image/jpeg',
    timestamp: 0,
    url: 'someurl.com/image',
    name: metaData.name
  };
}

// TODO: Finish implementing and test this method
/**
 * Discard an uploaded image on behalf of a user
 * @param uploader - The username of the uploader
 * @param imageId - The id of the post to remove
 * @returns The discarded image
 */
export async function discardImage(uploader: string, imageId: number) {
  return {
    id: imageId,
    uploader,
    contentType: 'image/jpeg',
    timestamp: 0,
    url: 'someurl.com/image',
    name: 'Some temporary name'
  };
}