import express, { Application } from "express";
import cors from "cors";
import path from "path";
import FeedbackRoute from "./Routes/feedback";
import ImagesProcessingRoute from "./Routes/imagesProcessing";
const app: Application = express();

//middlewars
app.use(express.static(path.join(__dirname, "uploads")));
app.use(cors());
// app.use(fileUpload());
app.use(express.json());

//routes
app.use("/api/v1/feedback", FeedbackRoute);
app.use("/api/v1/images-processing", ImagesProcessingRoute);

export default app;
