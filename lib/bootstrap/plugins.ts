'use strict';

import * as path from 'path';
import * as fs from 'fs';

import * as hapi from 'hapi';
import * as hapiAuthJWT from 'hapi-auth-jwt2';
import * as config from '../config';

const inert = require('inert');

const authOptions = {
  key: config.JWT_SECRET,
  validateFunc: (token, _, done) => done(null, true, token),
  algorithms: ['HS256']
};

const importedPlugins = [
  hapiAuthJWT,
  inert
];

export default async function(server: hapi.Server) {
  const pluginDir = path.join(config.APP_ROOT, '/plugins');
  const plugins = fs.readdirSync(pluginDir)
    .filter(file => path.extname(file) === '.js')
    .map(file => require(path.join(pluginDir, file)).default);
  const allPlugins = importedPlugins.concat(plugins);

  server.register(allPlugins, (err) => {
    if (err) {
      console.error('Could not register plugins:', err);
      return Promise.reject(err);
    } else {
      server.auth.strategy('jwt', 'jwt', false, authOptions);
      return Promise.resolve();
    }
  });
}
