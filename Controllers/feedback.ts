import { NextFunction, Request, Response } from "express";
import BugReport from "../models/BugReport";
import Review from "../models/Review";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";
//bugs
// -1) create a new bug report
export const createAReport = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const report = await BugReport.create(req.body);
    // res.status(201).json()
    res.status(201).json({
      status: "success",
      message: "Report created",
      report,
    });
  }
);

// -2) get the last number of bugs reports
export const getReportLastNumber = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const reports = await BugReport.find();
    res.status(200).json({
      status: "success",
      reportNumber: reports.length + 1,
    });
  }
);

//reviews
export const createAReview = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const review = await Review.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Review created successfully",
      review,
    });
  }
);
