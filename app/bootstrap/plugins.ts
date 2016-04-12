'use strict';

import * as path from 'path';
import * as fs from 'fs';

import * as hapi from 'hapi';
import * as hapiAuthJWT from 'hapi-auth-jwt2';
import * as config from '../config';
import * as auth from '../lib/auth';

const authOptions = {
  key: config.JWT_SECRET,
  validateFunc: auth.authenticate,
  algorithms: ['HS256'],
};

const importedPlugins = [
  hapiAuthJWT
];

export default function(server: hapi.Server) {
  const pluginDir = path.join(config.APP_ROOT, '/plugins');
  const plugins = fs.readdirSync(pluginDir)
    .filter(file => path.extname(file) === '.js')
    .map(file => require(path.join(pluginDir, file)).default);
  const allPlugins = importedPlugins.concat(plugins);

  server.register(allPlugins, function(err) {
    if (err) {
      console.error('Could not register plugins:', err);
      process.exit(0);
    }
    server.auth.strategy('jwt', 'jwt', false, authOptions);
  });
}
