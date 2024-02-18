import { Router } from "express";
import executeRoutes from "./execute-code.route";
import authRouter from "./auth.route";

const mainRouter = Router();

mainRouter.use("/execute", executeRoutes);
mainRouter.use("/auth", authRouter);

export default mainRouter;
