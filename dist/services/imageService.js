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
exports.processImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const processImage = (inputPath, width, height, outputPath) => __awaiter(void 0, void 0, void 0, function* () {
    const output = outputPath || inputPath;
    // Check if the resized image already exists
    if (fs_1.default.existsSync(output)) {
        console.log("Using cached image");
        return;
    }
    yield (0, sharp_1.default)(inputPath)
        .resize(width, height)
        .toFile(output)
        .catch((err) => {
        console.error(err);
        throw new Error("Image processing failed");
    });
});
exports.processImage = processImage;
