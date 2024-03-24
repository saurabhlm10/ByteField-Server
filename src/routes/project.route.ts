import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.util";
import {
  createProject,
  getProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.post("/", asyncHandler(createProject));
projectRouter.get("/:id", asyncHandler(getProject));
projectRouter.get("/", asyncHandler(getProjects));
projectRouter.put("/:id", asyncHandler(updateProject));
projectRouter.delete("/:id", asyncHandler(deleteProject));
export default projectRouter;
