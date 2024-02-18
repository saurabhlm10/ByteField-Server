import { Router } from "express";
import executeRoutes from "./execute-code.route";

const mainRouter = Router();

mainRouter.use("/execute", executeRoutes);

export default mainRouter;
