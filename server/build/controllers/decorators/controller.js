"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadataKey_1 = require("./MetadataKey");
/**
 *
 * @param key Params from Metadata
 * @returns valid key
 */
function bodyValidtors(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send("invalid request");
            return;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                res.status(422).send("Missing property");
                return;
            }
        }
        next();
    };
}
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
            var requestBodyProps = Reflect.getMetadata(MetadataKey_1.Metadatakey.validator, target.prototype, key) || [];
            var validator = bodyValidtors(requestBodyProps);
            if (path) {
                router[method]("".concat(routePrefix).concat(path), middlewares, validator, routeHandler);
            }
        }
    };
}
exports.controller = controller;
