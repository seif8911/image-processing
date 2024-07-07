import { Request, Response } from "express";
import { processImage } from "../services/imageService";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

export const generatePlaceholder = async (req: Request, res: Response) => {
  const { width, height } = req.query;
  if (!width || !height) {
    return res.status(400).send("Width and height are required");
  }

  const imagePath = path.join("images", `placeholder-${width}x${height}.jpg`);
  await processImage(imagePath, Number(width), Number(height));
  res.sendFile(imagePath, { root: "." });
};

export const uploadImage = (req: Request, res: Response) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    res.status(200).send(req.file);
  });
};

export const resizeImage = async (req: Request, res: Response) => {
  const { filename, width, height } = req.query;
  if (!filename || !width || !height) {
    return res.status(400).send("Filename, width, and height are required");
  }

  const imagePath = path.join("images", filename as string);
  const resizedImagePath = path.join(
    "images",
    `resized-${width}x${height}-${filename}`,
  );
  await processImage(
    imagePath,
    Number(width),
    Number(height),
    resizedImagePath,
  );
  res.sendFile(resizedImagePath, { root: "." });
};
