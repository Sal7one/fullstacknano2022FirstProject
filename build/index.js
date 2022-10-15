"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var images_1 = __importDefault(require("./images"));
var validator_1 = __importDefault(require("./validator"));
var imageManipulator_1 = __importDefault(require("./imageManipulator"));
var imageFetcher_1 = __importDefault(require("./imageFetcher"));
var app = (0, express_1.default)();
var port = 3000;
app.get('/image', [validator_1.default, images_1.default, imageManipulator_1.default], function (req, res) {
    var finalImageName = req.query.finalImageName;
    (0, imageFetcher_1.default)(finalImageName).then(function (image) {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(image);
    });
});
app.listen(port, function () {
    console.log("server started at localhost:".concat(port));
});
