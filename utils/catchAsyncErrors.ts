import express, { Request, Response, NextFunction } from "express";
//standard error catcher

export const catchAsyncErrors = (fn: Function) => {
  //it receive an asynchrounous function
  //and return another function
  return (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch((error: any) => next(error));
};
