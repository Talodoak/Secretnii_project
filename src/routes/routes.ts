import express, { Router } from 'express'
import * as path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import {GeneralRoutes} from './general.router'

const expressRouter = express.Router()

export class InitRouter {
    constructor(app: express.Application) {
        InitRouter.attachMiddlewares(app);
        InitRouter.init();
        app.use(expressRouter);
    }

    // add any new route class below
    private static init(): void {
        new GeneralRoutes(expressRouter);
    }

    private static attachMiddlewares(app): void {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.set('view engine', 'hbs')

        app.use(express.static(path.join('./controllers/routes')));
        app.get('/', async (req, res) => {
            try {
                res.render(path.resolve('./views/index.hbs'));
            } catch (error) {
                console.log('files route error: ', error);
                res.end();
            }
        });
        app.get('/register', async (req, res) => {
            try {
                res.render(path.resolve('./views/register.hbs'));
            } catch (error) {
                console.log('files route error: ', error);
                res.end();
            }
        });
        app.get('/login', async (req, res) => {
            try {
                res.render(path.resolve('./views/login.hbs'));
            } catch (error) {
                console.log('files route error: ', error);
                res.end();
            }
        });
    }
}