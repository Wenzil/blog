'use strict';

import * as path from 'path';
import * as fs from 'fs';

import * as _ from 'lodash';
import * as hapi from 'hapi';
import * as config from '../config';

export default async function(server: hapi.Server) {
  const routeDir = path.join(config.APP_ROOT, '/routes');
  const routeGroups = fs.readdirSync(routeDir)
    .filter(file => path.extname(file) === '.js')
    .map(file => require(path.join(routeDir, file)).default);
  const routes = _.flatten(routeGroups);

  routes.forEach(route => server.route(route));
  return Promise.resolve();
}
