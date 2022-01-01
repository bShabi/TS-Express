"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadataKey_1 = require("./MetadataKey");
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        //  Insert Key into MetaData  for Controller class proptotype
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            //insert Path into MetaData
            var path = Reflect.getMetadata(MetadataKey_1.Metadatakey.path, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKey_1.Metadatakey.methmod, target.prototype, key);
            var middlewares = Reflect.getMetadata(MetadataKey_1.Metadatakey.middleware, target.prototype, key) || [];
            if (path) {
                router[method]("".concat(routePrefix).concat(path), middlewares, routeHandler);
            }
        }
    };
}
exports.controller = controller;
