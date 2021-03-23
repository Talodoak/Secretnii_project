"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
class MysqlDb {
    get config() {
        return {
            USERNAME: process.env.MYSQL_USERNAME,
            PASSWORD: process.env.MYSQL_PASSWORD,
            HOST: process.env.MYSQL_HOSTNAME,
            PORT: process.env.MYSQL_PORT,
            DB_NAME: process.env.MYSQL_DB
        };
    }
    async connect() {
        const { USERNAME, PASSWORD, HOST, PORT, DB_NAME } = this.config;
        this.db = await promise_1.default.createConnection({
            host: HOST,
            port: PORT,
            user: USERNAME,
            password: PASSWORD,
            database: DB_NAME
        });
        console.log('MySQL connection opened');
        global['Mysql.DB'] = this.db;
    }
}
exports.default = new MysqlDb();
//# sourceMappingURL=mysql.db.js.map