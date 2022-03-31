import express from "express";
import {
  createAReport,
  getReportLastNumber,
  createAReview,
  checkIfUserReactedBeforeAndGetReaction,
} from "../Controllers/feedback";

const route = express.Router();

//bugs
route
  .post("/bugs-reports", createAReport)
  .get("/bugs-reports", getReportLastNumber);

//reviews
route.post("/create-reviews", createAReview);
route.post("/check-user-review", checkIfUserReactedBeforeAndGetReaction);

export default route;
