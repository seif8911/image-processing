import sharp from "sharp";
import fs from "fs";
import path from "path";

export const processImage = async (
  inputPath: string,
  width: number,
  height: number,
  outputPath?: string,
) => {
  const output = outputPath || inputPath;

  // Check if the resized image already exists
  if (fs.existsSync(output)) {
    console.log("Using cached image");
    return;
  }

  await sharp(inputPath)
    .resize(width, height)
    .toFile(output)
    .catch((err) => {
      console.error(err);
      throw new Error("Image processing failed");
    });
};
