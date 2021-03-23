"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitRouter = void 0;
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const general_router_1 = require("./general.router");
const expressRouter = express_1.default.Router();
class InitRouter {
    constructor(app) {
        InitRouter.attachMiddlewares(app);
        InitRouter.init();
        app.use(expressRouter);
    }
    // add any new route class below
    static init() {
        new general_router_1.GeneralRoutes(expressRouter);
    }
    static attachMiddlewares(app) {
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use(cookie_parser_1.default());
        app.set('view engine', 'hbs');
        app.use(express_1.default.static(path.join('./controllers/routes')));
        app.get('/', async (req, res) => {
            try {
                res.render(path.resolve('./views/index.hbs'));
            }
            catch (error) {
                console.log('files route error: ', error);
                res.end();
            }
        });
        app.get('/register', async (req, res) => {
            try {
                res.render(path.resolve('./views/register.hbs'));
            }
            catch (error) {
                console.log('files route error: ', error);
                res.end();
            }
        });
        app.get('/login', async (req, res) => {
            try {
                res.render(path.resolve('./views/login.hbs'));
            }
            catch (error) {
                console.log('files route error: ', error);
                res.end();
            }
        });
    }
}
exports.InitRouter = InitRouter;
//# sourceMappingURL=routes.js.map