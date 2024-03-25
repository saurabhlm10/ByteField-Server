import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.util";
import {
  createFileFolder,
  deleteFileFolder,
  getAllFileFolders,
  getFileFolder,
  updateFileFolder,
} from "../controllers/file-folder.controller";

const fileFolderRouter = Router();

fileFolderRouter.post("/:projectId", asyncHandler(createFileFolder));
fileFolderRouter.get("/:projectId/:id", asyncHandler(getFileFolder));
fileFolderRouter.get("/:projectId/", asyncHandler(getAllFileFolders));
fileFolderRouter.put("/:projectId/:id", asyncHandler(updateFileFolder));
fileFolderRouter.delete("/:projectId/:id", asyncHandler(deleteFileFolder));

export default fileFolderRouter;
