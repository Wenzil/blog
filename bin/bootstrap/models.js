var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var models_1 = require('../models');
function default_1(sequelize, config) {
    var modelDir = path.join(config.appRoot, '/models');
    var models = fs.readdirSync(modelDir).filter(function (file) {
        return path.basename(file) !== 'index.js' && path.extname(file) !== '.map';
    }).map(function (file) {
        var modelDefinitionPath = path.join(modelDir, file);
        var modelDefinition = require(modelDefinitionPath).default;
        return sequelize.import(modelDefinitionPath, modelDefinition);
    });
    var modelsByName = _.indexBy(models, function (model) { return model.getTableName(); });
    _.merge(models_1.default, modelsByName);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
//# sourceMappingURL=models.js.map