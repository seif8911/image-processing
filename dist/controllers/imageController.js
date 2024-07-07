"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = exports.uploadImage = exports.generatePlaceholder = void 0;
const imageService_1 = require("../services/imageService");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage }).single("image");
const generatePlaceholder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { width, height } = req.query;
    if (!width || !height) {
        return res.status(400).send("Width and height are required");
    }
    const imagePath = path_1.default.join("images", `placeholder-${width}x${height}.jpg`);
    yield (0, imageService_1.processImage)(imagePath, Number(width), Number(height));
    res.sendFile(imagePath, { root: "." });
});
exports.generatePlaceholder = generatePlaceholder;
const uploadImage = (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer_1.default.MulterError) {
            return res.status(500).json(err);
        }
        else if (err) {
            return res.status(500).json(err);
        }
        res.status(200).send(req.file);
    });
};
exports.uploadImage = uploadImage;
const resizeImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    if (!filename || !width || !height) {
        return res.status(400).send("Filename, width, and height are required");
    }
    const imagePath = path_1.default.join("images", filename);
    const resizedImagePath = path_1.default.join("images", `resized-${width}x${height}-${filename}`);
    yield (0, imageService_1.processImage)(imagePath, Number(width), Number(height), resizedImagePath);
    res.sendFile(resizedImagePath, { root: "." });
});
exports.resizeImage = resizeImage;
