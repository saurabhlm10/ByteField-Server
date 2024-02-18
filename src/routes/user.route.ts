import { Router } from "express";
import { verifyToken } from "../middleware/verify-token.middleware";
import { asyncHandler } from "../utils/asyncHandler.util";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/profile", verifyToken, asyncHandler(getUserProfile));
userRouter.put("/profile", verifyToken, asyncHandler(updateUserProfile));

export default userRouter;
