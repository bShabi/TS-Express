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
// router.post('/login', (req: RequestWithBody, res: Response) => {
//   const { email, password } = req.body;
//   if (
//     email &&
//     password &&
//     email === 'benshabi@outlook.com' &&
//     password === '123456'
//   ) {
//     //  mark this person logged in
//     req.session = { IsLogged: true };
//     //  redirect them on the root  route
//     res.redirect('/');
//   } else {
//     res.send(`invalid email or password`);
//   }
// });
// router.get('/',(req: Request,res:Response) => {
//     if(req.session && req.session.IsLogged) {
//         res.send(`
//         <div>
//             <div>
//                 Are you logged in
//                 <a href="/logout">Logout</a>
//             </div>
//         </div>
//         `)
//     }else {
//         res.send(`
//         <div>
//             <div>
//                 Are you not logged in
//                 <a href="/login">Login</a>
//             </div>
//         </div>
//         `)
//     }
// } )
// router.get('/logout',(req:Request,res:Response) => {
//   req.session = undefined
//   res.redirect('/')
// })
router.get('/protected', requireAuth, function (req, res) {
    res.send("\n    <div>\n      <h1>Wellcome</h1><span>to protced route</span>\n    </div>\n  ");
});
