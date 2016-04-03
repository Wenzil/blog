var express = require('express');
var Sequelize = require('sequelize');
var config_1 = require('./bootstrap/config');
var express_1 = require('./bootstrap/express');
var models_1 = require('./bootstrap/models');
var config = config_1.default();
var app = express();
var sequelize = new Sequelize(config.db);
express_1.default(app, config);
models_1.default(sequelize, config);
app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});
//# sourceMappingURL=index.js.map