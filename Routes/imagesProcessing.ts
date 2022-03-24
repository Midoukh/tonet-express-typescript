import express from "express";
import {
  handleImageCompression,
  getImagesMetaData,
  handleUploadImageByUrl,
} from "../Controllers/imagesProcessing";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const route = express.Router();

//compression
route.post("/compression", upload.single("file"), handleImageCompression);
route.post("/upload-by-url", handleUploadImageByUrl);
//color matching
route.post("/matching", upload.array("file", 2), getImagesMetaData);

export default route;
