import { controller, get, use } from "./decorators";
import {Request,Response,NextFunction} from 'express'


function requireAuth(req:Request,res:Response,next: NextFunction):void {
    if(req.session && req.session.IsLogged){
      next()
      return
    }
    res.status(403);
    res.send(`Not permitted`)
  }

@controller('')
class roorController {

    @get('/')
    getRoot(req: Request,res:Response) {
        if(req.session && req.session.IsLogged) {
            res.send(`
            <div>
                <div>
                    Are you logged in
                    <a href="/auth/logout">Logout</a>
                </div>
            </div>
            `)
        }else {
            res.send(`
            <div>
                <div>
                    Are you not logged in
                    <a href="/auth/login">Login</a>
                </div>
            </div>
            `)
        }
        
    }
    @get('/protected')
    @use(requireAuth)
    getProtected(req:Request,res:Response) {
        res.send(`
          <div>
            <h1>Wellcome</h1><span>to protced route</span>
          </div>
        `)
      }
}