import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.util";
import { executeCodeController } from "../controllers/execute-code.controller";

const executeRoutes = Router();

executeRoutes.post("/", asyncHandler(executeCodeController));

export default executeRoutes;
