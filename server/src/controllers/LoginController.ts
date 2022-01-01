import { NextFunction, Request, Response } from 'express';
import { controller,get,use } from './decorators';

// function loger(req:Request,res:Response,next: NextFunction) {
//   console.log("Request is made") 
//   next()
// }


@controller('/auth')
class LoginController {
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
}
