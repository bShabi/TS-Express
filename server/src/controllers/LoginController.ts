import { NextFunction, Request, Response } from 'express';
import { controller, get, use, bodyValidtor, post } from './decorators';

// function loger(req:Request,res:Response,next: NextFunction) {
//   console.log("Request is made")
//   next()
// }

@controller('/auth')
export class LoginController {
  @get('/login')
  // @use(loger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyValidtor('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email === 'benshabi@outlook.com' && password === '123456') {
      //  mark this person logged in
      req.session = { IsLogged: true };
      //  redirect them on the root  route
      res.redirect('/');
    } else {
      res.send(`invalid email or password`);
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}
