import { Router } from "express";
import { verifyToken } from "../middleware/verify-token.middleware";
import { asyncHandler } from "../utils/asyncHandler.util";
import {
  createSnippet,
  getSnippetById,
  getAllSnippets,
  updateSnippet,
  deleteSnippet,
} from "../controllers/snippet.controller";

const snippetRouter = Router();

snippetRouter.post("/", verifyToken, asyncHandler(createSnippet));
snippetRouter.get("/:id", verifyToken, asyncHandler(getSnippetById));
snippetRouter.get("/", verifyToken, asyncHandler(getAllSnippets));
snippetRouter.put("/:id", verifyToken, asyncHandler(updateSnippet));
snippetRouter.delete("/:id", verifyToken, asyncHandler(deleteSnippet));

export default snippetRouter;
