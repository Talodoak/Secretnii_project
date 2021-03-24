import express, { Router } from 'express'
import { config } from 'dotenv'
import http from 'http'
import mysqlDb from './db/mysql.db'
import RedisDB from './db/redis.db'
import { Server } from "socket.io"
import session from "express-session";
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'


require('source-map-support').install()

config()

export class App {
    private readonly PORT: number|string
    private readonly MODE: string
    private hostname:string
    protected app: express.Application
    private readonly server: http.Server
    protected io:Server
    private readonly sessionMiddleware:express.RequestHandler


    constructor(port:number, hostname:string) {
        this.PORT = Number(process.env.PORT) || port.toString()
        this.hostname = hostname
        this.MODE = process.env.NODE_ENV || 'development'
        this.app = express()
        this.server = new http.Server(this.app);
        this.io = new Server(this.server) // send to io class?

        var expiryDate = new Date( Date.now() + 60 * 60 * 1000 );
        this.sessionMiddleware = session({
            name:'session',
            cookie: {
                maxAge: 36000000,
                httpOnly: false
            },
            secret : 'false',
            saveUninitialized: true,
        })
        this.serverSetup()
        this.listen()
        this.connect()
    }

    private listen(): void {
        this.server.listen(this.PORT, () => {
            console.log(`App is listening on the port ${this.PORT} on ${this.MODE} mode`)
        })

    }

    private serverSetup():void {
        // Express middleware private session data/setup.
        this.io.use((socket, next) => {
            return this.sessionMiddleware(socket.request, socket.request.res, next)
        })
        this.app.use(this.sessionMiddleware);

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());

        this.app.use(express.static('public'));
        this.app.set('view engine', 'ejs');
    }


    private async connect(): Promise<void> {
        await mysqlDb.connect()
        await RedisDB.connect()
    }
}