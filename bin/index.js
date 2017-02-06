"use strict";
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const config = require("./config");
const errorLogger = require("./util/error-logger");
const error_handler_1 = require("./middleware/error-handler");
const content_negotation_1 = require("./middleware/content-negotation");
const not_found_1 = require("./middleware/not-found");
const routes_1 = require("./routes");
exports.app = new Koa();
exports.app
    .use(error_handler_1.default)
    .use(content_negotation_1.default)
    .use(bodyParser())
    .use(routes_1.default.routes())
    .use(routes_1.default.allowedMethods())
    .use(not_found_1.default);
exports.app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`));
exports.app.on('error', (err, ctx) => {
    errorLogger.logError(err, ctx);
});
//# sourceMappingURL=index.js.map