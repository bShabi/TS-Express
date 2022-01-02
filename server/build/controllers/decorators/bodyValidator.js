"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidtor = void 0;
require("reflect-metadata");
var MetadataKey_1 = require("./MetadataKey");
function bodyValidtor() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadataKey_1.Metadatakey.validator, keys, target, key);
    };
}
exports.bodyValidtor = bodyValidtor;
