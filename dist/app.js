"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const http_1 = __importDefault(require("http"));
const mysql_db_1 = __importDefault(require("./db/mysql.db"));
const redis_db_1 = __importDefault(require("./db/redis.db"));
const socket_io_1 = require("socket.io");
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require('source-map-support').install();
dotenv_1.config();
class App {
    constructor(port, hostname) {
        this.PORT = Number(process.env.PORT) || port.toString();
        this.hostname = hostname;
        this.MODE = process.env.NODE_ENV || 'development';
        this.app = express_1.default();
        this.server = new http_1.default.Server(this.app);
        this.io = new socket_io_1.Server(this.server); // send to io class?
        var expiryDate = new Date(Date.now() + 60 * 60 * 1000);
        this.sessionMiddleware = express_session_1.default({
            name: 'session',
            cookie: {
                maxAge: 36000000,
                httpOnly: false
            },
            secret: false,
            saveUninitialized: true,
        });
        this.serverSetup();
        this.listen();
        this.connect();
    }
    listen() {
        this.server.listen(this.PORT, () => {
            console.log(`App is listening on the port ${this.PORT} on ${this.MODE} mode`);
        });
    }
    serverSetup() {
        // Express middleware private session data/setup.
        this.io.use((socket, next) => {
            return this.sessionMiddleware(socket.request, socket.request.res, next);
        });
        this.app.use(this.sessionMiddleware);
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use(cookie_parser_1.default());
        this.app.use(express_1.default.static('public'));
        this.app.set('view engine', 'ejs');
    }
    async connect() {
        await mysql_db_1.default.connect();
        await redis_db_1.default.connect();
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map