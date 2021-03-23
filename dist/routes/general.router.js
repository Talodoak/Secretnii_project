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
exports.GeneralRoutes = void 0;
const mega_router_1 = __importDefault(require("./mega.router"));
const authController = __importStar(require("../controllers/auth"));
class GeneralRoutes extends mega_router_1.default {
    constructor(router) {
        super(router);
        this.post('/login', authController.login);
        this.post('/register', authController.register);
        this.get('/getusersbyid/:id', authController.getusersbyid);
        this.put('/updateuserbyid/:id', authController.updateuserbyid);
        this.delete('/deleteuserbyid/:id', authController.deleteuserbyid);
    }
}
exports.GeneralRoutes = GeneralRoutes;
//# sourceMappingURL=general.router.js.map