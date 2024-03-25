import { Router } from "express";
import executeRoutes from "./execute-code.route";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import snippetRouter from "./snippet.route";
import projectRouter from "./project.route";
import fileFolderRouter from "./file-folder.route";

const mainRouter = Router();

mainRouter.use("/execute", executeRoutes);
mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/snippet", snippetRouter);
mainRouter.use("/project", projectRouter);
mainRouter.use("/file-folder", fileFolderRouter);
export default mainRouter;
