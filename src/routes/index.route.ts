import { Router } from "express";
import executeRoutes from "./execute-code.route";
import authRouter from "./auth.route";
import userRouter from "./user.route";

const mainRouter = Router();

mainRouter.use("/execute", executeRoutes);
mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);

export default mainRouter;
