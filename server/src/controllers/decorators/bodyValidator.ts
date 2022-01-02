import 'reflect-metadata'
import { Metadatakey } from './MetadataKey'


export function bodyValidtor(...keys:string[]) {
    return function(target:any,key:string,desc:PropertyDescriptor) {
        Reflect.defineMetadata(Metadatakey.validator,keys,target,key)
    }
}