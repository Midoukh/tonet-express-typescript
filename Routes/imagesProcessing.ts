import express from "express";
import { handleImageCompression } from "../Controllers/imagesProcessing";

const route = express.Router();

//compression
route.post("/compression", handleImageCompression);

export default route;
