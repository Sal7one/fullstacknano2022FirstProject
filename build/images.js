"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var imageHandler = function (req, res, next) {
    // User Query
    var userQuery = req.query;
    // User Data
    var filename = userQuery.filename;
    var widthParam = req.query.width;
    var heightParam = req.query.height;
    // Use the data
    var width = parseInt(widthParam);
    var height = parseInt(heightParam);
    var finalImageName = "".concat(filename).concat(width).concat(height, ".jpg");
    req.query.finalImageName = finalImageName;
    console.log("checking in " + __dirname);
    fs_1.promises.stat(__dirname + "\\modified\\" + finalImageName)
        .then(function () {
        console.log("We Manupliated this image before");
        req.query.manipulateImage = "false";
        next();
    })
        .catch(function () {
        next();
    });
};
exports.default = imageHandler;
