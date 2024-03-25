import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.util";
import {
  createProject,
  getProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";
import { verifyToken } from "../middleware/verify-token.middleware";

const projectRouter = Router();

projectRouter.post("/", verifyToken, asyncHandler(createProject));
projectRouter.get("/:id", verifyToken, asyncHandler(getProject));
projectRouter.get("/", verifyToken, asyncHandler(getProjects));
projectRouter.put("/:id", verifyToken, asyncHandler(updateProject));
projectRouter.delete("/:id", verifyToken, asyncHandler(deleteProject));
export default projectRouter;
