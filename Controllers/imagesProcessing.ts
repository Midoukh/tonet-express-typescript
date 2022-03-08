import sharp from "sharp";
import multer from "multer";
import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
  console.log("looking for a file");
  // if (!req.file) {
  //   res.status(400).json({ message: "Please upload a file!" });
  //   next();
  // }

  console.log(req.files!.file);

  const { data: buffer, name: originalname }: any = req.files!.file;
  const timestamp = new Date().toISOString();
  const ref = `${timestamp}-${originalname}.webp`;

  await sharp(buffer)
    .webp({ quality: 20 })
    .toFile("../uploads" + ref);

  const link = `http://localhost:${req.socket.localPort}/${ref}`;
  console.log(link);
  res.status(201).json({ link });
};
