"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_redis_1 = __importDefault(require("async-redis"));
class RedisDB {
    get config() {
        return {
            host: 'localhost',
            port: '6379',
        };
    }
    async connect() {
        const { host, port } = this.config;
        this.db = await async_redis_1.default.createClient({ host, port });
        this.db.select(0);
        console.log('Redis connection opened');
        global['Redis.DB'] = this.db;
    }
}
exports.default = new RedisDB();
//# sourceMappingURL=redis.db.js.map