import AWS, { KinesisVideoSignalingChannels } from "aws-sdk";
import CustomError from "../utils/customError.util";
import axiosInstance from "../config/axiosInstance";
import { ENV } from "../constants/ENV";
import { AxiosError } from "axios";

// Configure AWS
AWS.config.update({ region: "ap-south-1" });

export class ExecuteCodeService {
  async executeCode(code: string): Promise<any> {
    const lambdaUrl = ENV.lambdaUrl;

    try {
      const response = await axiosInstance.post(lambdaUrl, {
        code,
      });
      return response.data.result;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new CustomError(error.response?.data.message, 500);
      }

      console.error("An error occurred:", error);
      throw new CustomError("Failed to execute code", 500);
    }
  }
}
