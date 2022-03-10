import sharp from "sharp";
import multer from "multer";
import fs from "fs";
import { readFile } from "fs/promises";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";

//compression
export const handleImageCompression = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //check for the uploads folder if doesn't exist create one
  fs.access("./uploads", (error) => {
    if (error) {
      fs.mkdirSync("./uploads");
    }
  });

  try {
    const { buffer, originalname }: any = req.file;
    const timestamp = new Date().toISOString();
    const ref = `${timestamp}-${originalname}.webp`;

    //1) compression
    console.log(req.file);
    console.log(path.join(__dirname, "../", "uploads/"));
    const newImage = await sharp(buffer).webp({ quality: 50 }).toBuffer();

    const prefix = "data:image/webp;base64,";
    const base64 = `${prefix}${Buffer.from(newImage).toString("base64")}`;

    const compressedImage = {
      name: ref,
      base64,
    };
    res
      .status(201)
      .json({ message: "Image successfully compressed", compressedImage });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "cant upload",
      })
      .end();
  }
  next();
};
