'use strict';
const hapi = require("hapi");
const config = require("./config");
const routes_1 = require("./bootstrap/routes");
const plugins_1 = require("./bootstrap/plugins");
const server = new hapi.Server();
server.connection({ port: config.PORT });
plugins_1.default(server)
    .then(() => routes_1.default(server))
    .then(() => server.start())
    .then(() => console.log(`Server running at: ${server.info.uri}`))
    .catch(err => { throw err; });
//# sourceMappingURL=index.js.map