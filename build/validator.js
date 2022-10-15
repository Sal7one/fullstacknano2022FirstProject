"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var queryValidator = function (req, res, next) {
    var userQuery = req.query;
    if (userQuery.filename == undefined ||
        userQuery.width == undefined ||
        userQuery.height == undefined) {
        res.end("Missing data");
    }
    next();
};
exports.default = queryValidator;
