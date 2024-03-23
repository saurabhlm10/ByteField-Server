import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  lambdaUrl: process.env.EXECUTE_CODE_LAMBDA_URL as string,
  clientUrl: process.env.CLIENT_URL as string,
};
