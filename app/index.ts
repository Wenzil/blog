
import * as express from 'express';
import * as Sequelize from 'sequelize';
import bootstrapConfig from './bootstrap/config';
import bootstrapExpress from './bootstrap/express';
import bootstrapModels from './bootstrap/models';

let config = bootstrapConfig();
let app = express();
let sequelize = new Sequelize(config.db);

bootstrapExpress(app, config);
bootstrapModels(sequelize, config);

app.listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});
