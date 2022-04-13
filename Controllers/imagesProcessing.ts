import sharp from "sharp";
import axios from "axios";
import prettyBytes from "pretty-bytes";

import fs from "fs";
import path, { resolve } from "path";
import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";
import { bytesToMB } from "../utils/conversions";
import { getDominantColor } from "../utils/colors";

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

    //2) get dominant color
    const { r, g, b } = await getDominantColor(buffer);

    res.status(201).json({
      message: "Image successfully compressed",
      compressedImage,
      avg_color: `rgb(${r}, ${g}, ${b})`,
    });
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

export const getImagesMetaData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { SourceImg, TargetImg } = req.body;

    if (SourceImg.isUrl) {
      const srcImg = await getImageFromURL(SourceImg.src, res, next);
      const meta = await sharp(srcImg).metadata();
      // console.log("srcImg meta : ", meta);
      convertImageToLAB(srcImg);
    }
    if (TargetImg.isUrl) {
      const targImg = await getImageFromURL(TargetImg.src, res, next);
      const meta = await sharp(targImg).metadata();
      convertImageToLAB(targImg);
      // console.log("SourceImg meta: ", meta);
    }
    res.status(201).json({
      message: "Target and Source image successfully received",
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleUploadImageByUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { imageURL } = req.body;
  try {
    const response = await axios.get(imageURL, {
      responseType: "arraybuffer",
    });
    console.log(response);
    const isImage = response.headers["content-type"].includes("image/jpeg");

    //check if data exist on the response object
    if (!isImage) {
      res.status(200).json({
        status: "fail",
        message: "There's no image in this URL!",
      });
      return next();
    }

    //get image metadata
    const metadata: any = await sharp(response.data).metadata();
    const { size: imageSize } = metadata;

    //convert image from bytes to mb
    const imageSizeInMB = bytesToMB(imageSize);

    //limit the image size to 20mb max
    if (imageSizeInMB > 20) {
      res.status(500).json({
        status: "Error!",
        message: "Image size too big, should be 20mb or less",
      });
      return null;
    }

    //compress image and send it to client
    const newImage = await sharp(response.data)
      .webp({ quality: 50 })
      .toBuffer();

    const prefix = "data:image/webp;base64,";
    const base64 = `${prefix}${Buffer.from(newImage).toString("base64")}`;

    const compressedImage = {
      name: `IMG-${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getMilliseconds()}`,
      base64,
    };
    console.log("success");
    res.status(200).json({
      status: "Success",
      compressedImage,
    });
  } catch (error: any) {
    res.status(500).json({
      error,
    });
  }
};

const getImageFromURL = async (
  url: string,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  const isImage = response.headers["content-type"].includes("image/jpeg");

  //check if data exist on the response object
  if (!isImage) {
    res.status(200).json({
      status: "fail",
      message: "There's no image in this URL!",
    });
    return next();
  }

  return new Promise((resolve) => resolve(response.data));
};

const convertImageToLAB = async (image: Buffer): Promise<any> => {
  //this function convert the input image to the L*a*b* color space
  const lab = await sharp(image).toColorspace("lab");
  console.log("The L*A*B color space: \n");
  console.log(lab);
};
