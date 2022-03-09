import express from "express";
import { handleImageCompression } from "../Controllers/imagesProcessing";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const route = express.Router();

//compression
route.post("/compression", upload.single("file"), handleImageCompression);

export default route;
