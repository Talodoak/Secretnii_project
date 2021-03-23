import mysql from 'mysql2/promise'

interface Config {
    USERNAME: string
    PASSWORD: string
    HOST: string
    PORT: string
    DB_NAME: string
}
class MysqlDb {
    public db

    private get config(): Config {
        return {
            USERNAME: process.env.MYSQL_USERNAME,
            PASSWORD: process.env.MYSQL_PASSWORD,
            HOST: process.env.MYSQL_HOSTNAME,
            PORT: process.env.MYSQL_PORT,
            DB_NAME: process.env.MYSQL_DB
        }
    }

    public async connect(): Promise<void> { 
        const {
            USERNAME,
            PASSWORD,
            HOST,
            PORT,
            DB_NAME
        } = this.config

        this.db = await mysql.createConnection({
            host: HOST,
            port: PORT,
            user: USERNAME,
            password: PASSWORD,
            database: DB_NAME
        })
        console.log('MySQL connection opened')
        global['Mysql.DB'] = this.db
    }
}

export default new MysqlDb()