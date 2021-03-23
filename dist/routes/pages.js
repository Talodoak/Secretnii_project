"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
app.get('/', async (req, res) => {
    res.render('index.hbs');
});
app.get('/register', async (req, res) => {
    res.render('register.hbs');
});
//# sourceMappingURL=pages.js.map