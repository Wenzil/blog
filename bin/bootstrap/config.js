"use strict";
const path = require('path');
function default_1() {
    const env = process.env.NODE_ENV || 'development';
    const root = path.normalize(`${__dirname}/../..`);
    const appRoot = path.normalize(`${__dirname}/..`);
    global.config = require(`../../config/${env}`);
    config.root = root;
    config.appRoot = appRoot;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
//# sourceMappingURL=config.js.map