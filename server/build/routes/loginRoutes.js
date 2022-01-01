"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
// MiddleWare to proteced 
function requireAuth(req, res, next) {
    if (req.session && req.session.IsLogged) {
        next();
        return;
    }
    res.status(403);
    res.send("Not permitted");
}
var router = (0, express_1.Router)();
exports.router = router;
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
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
        res.send("invalid email or password");
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.IsLogged) {
        res.send("\n        <div>\n            <div>\n                Are you logged in\n                <a href=\"/logout\">Logout</a>\n            </div>\n        </div>\n        ");
    }
    else {
        res.send("\n        <div>\n            <div>\n                Are you not logged in\n                <a href=\"/login\">Login</a>\n            </div>\n        </div>\n        ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send("\n    <div>\n      <h1>Wellcome</h1><span>to protced route</span>\n    </div>\n  ");
});
