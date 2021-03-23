import redis from 'async-redis'

interface Config {
    host: string
    port: string
}
class RedisDB {
    public db: redis

    private get config(): Config {
        return {
            host: 'localhost',
            port: '6379',
        };
    }

    public async connect(): Promise<redis> {
        const { host, port } = this.config

        this.db = await redis.createClient({ host, port })
        this.db.select(0)
        console.log('Redis connection opened')
        global['Redis.DB'] = this.db
    }
}

export default new RedisDB()
