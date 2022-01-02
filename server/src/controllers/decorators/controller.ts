import 'reflect-metadata';
import express from 'express';
import { AppRouter } from '../../AppRouter';
import { Methods } from './methods';
import { Metadatakey } from './MetadataKey'; 
import { NextFunction, Request, Response,RequestHandler } from 'express';


/**
 * 
 * @param key Params from Metadata
 * @returns valid key
 */
function bodyValidtors(keys:string):RequestHandler {
  return function(req:Request,res:Response,next:NextFunction) {
    if(!req.body) {
      res.status(422).send(`invalid request`)
      return
    }
    for(let key of keys) {
      if(!req.body[key]) {
        res.status(422).send(`Missing property`)
        return
      }
    }
    next()
  }
}
export function controller(routePrefix: string) {
  return function(target: Function) {
    const router = AppRouter.getInstance()
    
    //  Insert Key into MetaData  for Controller class proptotype
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      //insert Path into MetaData
      const path = Reflect.getMetadata(Metadatakey.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(Metadatakey.methmod, target.prototype, key);
      const middlewares = Reflect.getMetadata(Metadatakey.middleware, target.prototype, key) || [];
      const requestBodyProps = Reflect.getMetadata(Metadatakey.validator,target.prototype,key) || []

      const validator = bodyValidtors(requestBodyProps)

      if (path) {
        router[method](`${routePrefix}${path}`, middlewares,validator,routeHandler);
      }
    }
  };
}
