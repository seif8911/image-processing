"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageController_1 = require("../controllers/imageController");
const router = (0, express_1.Router)();
router.get("/placeholder", imageController_1.generatePlaceholder);
router.post("/upload", imageController_1.uploadImage);
router.get("/resize", imageController_1.resizeImage);
exports.default = router;
