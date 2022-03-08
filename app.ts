import express, { Application } from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import FeedbackRoute from "./Routes/feedback";
import ImagesProcessingRoute from "./Routes/imagesProcessing";
const app: Application = express();

//middlewars
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("./uploads"));

//routes
app.use("/api/v1/feedback", FeedbackRoute);
app.use("/api/v1/images-processing", ImagesProcessingRoute);

export default app;
