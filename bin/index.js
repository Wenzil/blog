'use strict';
const hapi = require('hapi');
const config = require('./config');
const routes_1 = require('./bootstrap/routes');
const plugins_1 = require('./bootstrap/plugins');
const server = new hapi.Server();
server.connection({ port: config.PORT });
plugins_1.default(server);
routes_1.default(server);
server.start(function (err) {
    if (err) {
        throw err;
    }
    else {
        console.log(`Server running at: ${server.info.uri}`);
    }
});
//# sourceMappingURL=index.js.map