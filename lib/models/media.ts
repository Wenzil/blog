import * as fs from 'fs';
import * as crypto from 'crypto';
import * as stream from 'stream';
import * as probeImageSize from 'probe-image-size';
import Err from '../util/err';
import * as mysah from 'mysah';

const fsRename = mysah.promisify(fs.rename);

interface Media {
  id: number;
  uploader: string;
  timestamp: number;
  url: string;
  metaData: MediaMetaData;
}

interface MediaMetaData {
  type: 'png' | 'jpg' | 'gif';
  width: number;
  height: number;
  name: string;
}

export default Media;

/**
 * Retrieve a blog post
 */
export async function add(uploader: string, sourceStream: NodeJS.ReadableStream, timestamp: number) {
  const filename = crypto.randomBytes(8).toString('hex');
  const tmpPath = `tmp/${filename}`;
  const passthroughStream = new stream.PassThrough();
  const fileWriteStream = fs.createWriteStream(tmpPath, { mode: 0o660 });
  const fileWritePromise = mysah.once(fileWriteStream, 'finish');

  sourceStream.pipe(passthroughStream);
  sourceStream.pipe(fileWriteStream);

  const { type, width, height } = await probeImageSize(passthroughStream)
    .catch(err => {
      if (err.code === 'ECONTENT') {
        throw new Err('Unrecognized image format');
      } else {
        throw err;
      }
    });
  const path = `uploads/${filename}.${type}`;

  await fileWritePromise;
  await fsRename(tmpPath, path);

  return {
    id: 1,
    uploader,
    timestamp,
    url: path,
    metaData: {
      type,
      width,
      height,
      name: filename
    }
  };
}
