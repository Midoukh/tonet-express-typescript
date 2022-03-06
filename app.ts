import express, { Application } from "express";
import FeedbackRoute from "./Routes/feedback";
const app: Application = express();

app.get("/", (req, res) => {
  res.send("Well done!");
});

app.use("/api/v1/feedback", FeedbackRoute);

export default app;
