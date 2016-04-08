'use strict';

import * as path from 'path';

export const PROJECT_ROOT = path.normalize(`${__dirname}/..`);
export const APP_ROOT = path.normalize(__dirname);
export const APP_NAME = 'blog';
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const DATABASE_URL = process.env.DATABASE_URL;
