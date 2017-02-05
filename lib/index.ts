'use strict';

import * as hapi from 'hapi';
import * as config from './config';
import bootstrapRoutes from './bootstrap/routes';
import bootstrapPlugins from './bootstrap/plugins';

const server = new hapi.Server();

server.connection({ port: config.PORT });

bootstrapPlugins(server)
  .then(() => bootstrapRoutes(server))
  .then(() => server.start())
  .then(() => console.log(`Server running at: ${server.info.uri}`))
  .catch(err => { throw err; });

