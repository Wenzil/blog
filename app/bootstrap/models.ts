import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import {Sequelize} from 'sequelize';
import modelsCache from '../models';

export default function(sequelize: Sequelize, config) {
  let modelDir = path.join(config.appRoot, '/models');
  let models = fs.readdirSync(modelDir).filter(function(file) {
    return path.basename(file) !== 'index.js' && path.extname(file) !== '.map';
  }).map(function(file) {
    let modelDefinitionPath = path.join(modelDir, file);
    let modelDefinition = require(modelDefinitionPath).default;
    return sequelize.import(modelDefinitionPath, modelDefinition);
  });

  let modelsByName = _.indexBy(models, model => model.getTableName());

  _.merge(modelsCache, modelsByName);
};

