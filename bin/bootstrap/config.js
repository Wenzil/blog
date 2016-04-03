var path = require('path');
function default_1() {
    var env = process.env.NODE_ENV || 'development';
    var root = path.normalize(__dirname + '/../..');
    var appRoot = path.normalize(__dirname + '/..');
    var config = require('../../config/' + env);
    config.root = root;
    config.appRoot = appRoot;
    return config;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
//# sourceMappingURL=config.js.map