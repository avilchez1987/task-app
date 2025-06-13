"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = require("express");
const serverless_express_1 = require("@vendia/serverless-express");
let cachedServer;
async function bootstrap() {
    const expressApp = (0, express_1.default)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    app.enableCors();
    await app.init();
    return (0, serverless_express_1.default)({ app: expressApp });
}
async function createServerIfNeeded() {
    if (!cachedServer) {
        cachedServer = await bootstrap();
    }
    return cachedServer;
}
const handler = async (event, context, callback) => {
    try {
        const server = await createServerIfNeeded();
        return server(event, context, callback);
    }
    catch (error) {
        callback(error);
    }
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map