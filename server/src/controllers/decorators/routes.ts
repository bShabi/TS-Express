import 'reflect-metadata';
import {Methods} from './methods'
import { Metadatakey } from './MetadataKey'; 
import { RequestHandler } from 'express';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler
}

function routerBinder(method: string) {
  return function(path: string) {
    return function(target: any, key: string, desc:RouteHandlerDescriptor) {
    Reflect.defineMetadata(Metadatakey.path, path, target, key);
    Reflect.defineMetadata(Metadatakey.methmod, method, target, key);
  };
}
}

//Rest api for route
export const get = routerBinder(Methods.get)
export const post = routerBinder(Methods.post)
export const put = routerBinder(Methods.put)
export const del = routerBinder(Methods.del)
export const patch = routerBinder(Methods.patch)
