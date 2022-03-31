import { NextFunction, Request, Response } from "express";
import BugReport from "../models/BugReport";
import Review from "../models/Review";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";
//bugs
// -1) create a new bug report
export const createAReport = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ipAdress } = req.body;
    try {
      //1) check if user alreader created a report before
      const reps = await BugReport.find({ ipAdress });
      if (reps.length >= 4) {
        res.status(200).json({
          status: "fail",
          message: `You can't create more than 4 reports`,
        });
        return next();
      }

      const report = await BugReport.create(req.body);
      res.status(201).json({
        status: "success",
        message: "Report created",
        report,
      });
    } catch (error: any) {
      console.log(error);
    }
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
export const checkIfUserReactedBeforeAndGetReaction = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ipAdress } = req.body;
    //1) check if user alreader created a reaction before
    const rec: any = await Review.findOne({ ipAdress });
    if (rec) {
      res.status(200).json({
        status: "success",
        message: "User already reacted before",
        rec,
      });
      return next();
    }
    res.status(200).json({
      status: "fail",
      message: "User hasn't reacted yet!",
    });
  }
);

export const createAReview = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ipAdress, reaction } = req.body;
    //1) check if user alreader created a reaction before
    const rev: any = await Review.findOne({ ipAdress });

    if (rev) {
      console.log(rev);
      const updatedRev = await Review.findByIdAndUpdate(rev._id, {
        reaction,
      });
      res.status(200).json({
        status: "success",
        message: "Review updated successfully",
        updatedRev,
      });
      return next();
    }
    console.log("no old review found");
    const review = await Review.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Review created successfully",
      review,
    });
  }
);
