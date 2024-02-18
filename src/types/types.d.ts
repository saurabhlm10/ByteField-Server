// src/@types/types.d.ts or src/@types/express/index.d.ts

import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: { userId: string }; // Adjust the type according to what you actually store in the request.user
  }
}
