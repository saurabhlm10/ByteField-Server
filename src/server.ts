import express from "express";
import { ENV } from "./constants/ENV";
import mainRouter from "./routes/index.route";

const app = express();

app.use(express.json());

app.use("/api", mainRouter);

const port = ENV.PORT;

app.listen(port, () => console.log("server listening on PORT", port));
