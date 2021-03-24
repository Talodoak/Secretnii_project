"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitRouter = void 0;
const express_1 = __importDefault(require("express"));
const general_router_1 = require("./general.router");
const expressRouter = express_1.default.Router();
class InitRouter {
    constructor(app) {
        InitRouter.init();
        app.use(expressRouter);
    }
    // add any new route class below
    static init() {
        new general_router_1.GeneralRoutes(expressRouter);
    }
}
exports.InitRouter = InitRouter;
//# sourceMappingURL=routes.js.map