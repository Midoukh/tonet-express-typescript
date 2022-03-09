import sharp from "sharp";
import multer from "multer";
import fs from "fs";
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
    const newImage = await sharp(buffer).webp({ lossless: true }).toBuffer();
    const compressedImage = {
      name: ref,
      buffer: newImage,
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
