import { Router } from "express";
import {
  generatePlaceholder,
  uploadImage,
  resizeImage,
} from "../controllers/imageController";

const router = Router();

router.get("/placeholder", generatePlaceholder);
router.post("/upload", uploadImage);
router.get("/resize", resizeImage);

export default router;
