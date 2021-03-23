import MegaRouter from './mega.router'
import * as  authController from '../controllers/auth'

export class GeneralRoutes extends MegaRouter {
    constructor(router:any) {
        super(router);
        this.post('/login', authController.login)
        this.post('/register', authController.register)
        this.get('/getusersbyid/:id', authController.getusersbyid)
        this.put('/updateuserbyid/:id', authController.updateuserbyid)
        this.delete('/deleteuserbyid/:id', authController.deleteuserbyid)
    }
}