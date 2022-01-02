import { Router, Request, Response, NextFunction } from 'express';
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

// MiddleWare to proteced 
function requireAuth(req:Request,res:Response,next: NextFunction):void {
  if(req.session && req.session.IsLogged){
    next()
    return
  }
  res.status(403);
  res.send(`Not permitted`)
}

const router = Router();

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
router.get('/protected',requireAuth,(req:Request,res:Response) => {
  res.send(`
    <div>
      <h1>Wellcome</h1><span>to protced route</span>
    </div>
  `)
})
export { router };
