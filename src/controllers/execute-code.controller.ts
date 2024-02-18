import { Request, Response } from "express";
import CustomError from "../utils/customError.util";
import { ExecuteCodeService } from "../services/execute-code.service";

const executeCodeService = new ExecuteCodeService();

export const executeCodeController = async (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code) {
    throw new CustomError("No Code Provided", 400);
  }

  const result = await executeCodeService.executeCode(code);
  return { result, status: 200 };
};
