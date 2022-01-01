import 'reflect-metadata';
import express from 'express';
import { AppRouter } from '../../AppRouter';
import { Methods } from './methods';
import { Metadatakey } from './MetadataKey'; 

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

      if (path) {
        router[method](`${routePrefix}${path}`, middlewares,routeHandler);
      }
    }
  };
}
