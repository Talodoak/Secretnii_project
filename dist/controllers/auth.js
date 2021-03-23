"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteuserbyid = exports.updateuserbyid = exports.getusersbyid = exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
async function login(req, res) {
    try {
        const { login, password } = req.body;
        const salt = 'takTosheRabotaet';
        let hashedPassword = crypto_1.default.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
        const candidateData = await global['Mysql.DB'].query('SELECT * FROM users WHERE email=? AND login=? AND password=?', [login, hashedPassword]);
        if (!login || !password) {
            return res.status(400).render('login', {
                message: 'Please provide an email, login and password'
            });
        }
        if (candidateData[0][0]) {
            const id = candidateData[0][0].id;
            let secretKey = process.env.SECRET_KEY;
            const token = jsonwebtoken_1.default.sign({ id: id }, secretKey, {
                expiresIn: 90
            });
            const cookieOptions = {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };
            res.cookie('jwt', token, cookieOptions);
            res.status(200).redirect('/chat');
        }
        else {
            return res.render('login', {
                message: 'Такого пользователя не существует или введен неверный пароль'
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.login = login;
async function register(req, res) {
    try {
        const { name, surname, email, login, password, passwordConfirm } = req.body;
        const candidateData = await global['Mysql.DB'].query('SELECT email FROM users WHERE email=?', [email]);
        if (candidateData[0][0]) {
            return res.render('register', {
                message: 'That email is already in use'
            });
        }
        else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }
        else {
            const salt = 'takTosheRabotaet';
            const hashedPassword = crypto_1.default.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
            await global['Mysql.DB'].query('INSERT INTO users (name, surname, email, login, password) VALUES (?, ?, ?, ?, ?)', [
                name, surname, email, login, hashedPassword
            ]);
            return res.render('register', {
                message: 'User registered, now u can login'
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.register = register;
async function getusersbyid(req, res) {
    try {
        const id = req.params.id;
        const userData = await global['Redis.DB'].get(id);
        if (userData) {
            res.send(JSON.parse(userData));
        }
        else {
            const user = await global['Mysql.DB'].query('SELECT * FROM users WHERE id=?', [id]);
            if (user[0][0].id) {
                await global['Redis.DB'].set(user[0][0].id, JSON.stringify(user[0][0]));
                res.send(user[0][0]);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.getusersbyid = getusersbyid;
async function updateuserbyid(req, res) {
    try {
        const id = req.params.id;
        const { name, surname, email, login, password } = req.body;
        const userData = await global['Redis.DB'].get(id);
        if (userData) {
            const salt = 'takTosheRabotaet';
            let hashedPassword = crypto_1.default.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
            await global['Mysql.DB'].query('UPDATE users SET name=?, surname=?, email=?, login=? WHERE id=?', [name, surname, email, login, hashedPassword, id]);
            await global['Redis.DB'].set(id, JSON.stringify({ name, surname, email, login, hashedPassword }));
            res.send('User updated');
        }
        else {
            res.send('Нет такого пользователя, попробуй снова сын мой');
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.updateuserbyid = updateuserbyid;
async function deleteuserbyid(req, res) {
    try {
        const id = req.params.id;
        const userData = await global['Redis.DB'].get(id);
        if (userData) {
            await global['Mysql.DB'].query('DELETE FROM users WHERE id=?', [id]);
            await global['Redis.DB'].del(id);
            res.send('Пользователь удален');
        }
        else {
            res.send('Нет такого пользователя');
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.deleteuserbyid = deleteuserbyid;
//# sourceMappingURL=auth.js.map