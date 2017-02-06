import * as crypto from 'crypto';
import * as async from 'async';

/**
 * Generate a hash from a password and salt
 *
 * @param password - The password for which to generate a hash
 * @param salt - The salt with which to generate the hash (defaulting to 128 random bytes)
 * @returns The generated hash and salt
 */
export async function generateHash(password: string, salt?: string) {
  return new Promise<{ hash: string, salt: string }>(
    (resolve, reject) => {
      const seq = async.seq(
        (_, next) => {
          crypto.randomBytes(128, next);
        },
        (bytes, next) => {
          salt = salt || new Buffer(bytes).toString('hex');
          crypto.pbkdf2(password, salt, 7000, 256, 'SHA1', next);
        }
      );

      seq(null, (err, bytes) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            hash: new Buffer(bytes).toString('hex'),
            salt
          });
        }
      });
    }
  );
}
