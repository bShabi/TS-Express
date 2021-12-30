"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// MiddleWare to proteced 
function requireAuth(req, res, next) {
    if (req.session && req.session.IsLogged) {
        next();
        return;
    }
    res.status(403);
    res.send(`Not permitted`);
}
const router = (0, express_1.Router)();
exports.router = router;
router.get('/login', (req, res) => {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" type="email"/>
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email &&
        password &&
        email === 'benshabi@outlook.com' &&
        password === '123456') {
        //  mark this person logged in
        req.session = { IsLogged: true };
        //  redirect them on the root  route
        res.redirect('/');
    }
    else {
        res.send(`invalid email or password`);
    }
});
router.get('/', (req, res) => {
    if (req.session && req.session.IsLogged) {
        res.send(`
        <div>
            <div>
                Are you logged in
                <a href="/logout">Logout</a>
            </div>
        </div>
        `);
    }
    else {
        res.send(`
        <div>
            <div>
                Are you not logged in
                <a href="/login">Login</a>
            </div>
        </div>
        `);
    }
});
router.get('/logout', (req, res) => {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, (req, res) => {
    res.send(`
    <div>
      <h1>Wellcome</h1><span>to protced route</span>
    </div>
  `);
});
