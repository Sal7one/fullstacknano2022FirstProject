"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var imageManipulator = function (req, res, next) {
    if (req.query.manipulateImage == "false")
        next();
    // User Query
    var userQuery = req.query;
    // User Data
    var filename = userQuery.filename;
    var widthParam = req.query.width;
    var heightParam = req.query.height;
    // Use the data
    var width = parseInt(widthParam);
    var height = parseInt(heightParam);
    // Image name in the file system
    var imageURL = "src\\images\\" + filename + ".jpg";
    // image name after we finish 
    var imageFileName = req.query.finalImageName;
    var dir = path_1.default.resolve(path_1.default.join(__dirname, 'modified'));
    if (!fs_1.default.existsSync(dir))
        fs_1.default.mkdirSync(dir);
    (0, sharp_1.default)(imageURL)
        .resize(width, height)
        .toFile(dir + "\\" + imageFileName, function (err, info) {
        next();
    });
};
exports.default = imageManipulator;
