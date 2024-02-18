import { NextFunction, Request, Response } from "express";
import CustomError from "./customError.util";

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { result, status = 200 } = await fn(req, res, next);
      if (result !== undefined) {
        res.status(status).json(result);
      } else {
        res.sendStatus(status);
      }
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode || 500).json({
          success: false,
          message: error.message,
        });
      } else {
        console.error("Unhandled Error: ", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    }
  };
