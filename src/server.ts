import express from "express";
import { ENV } from "./constants/ENV";
import mainRouter from "./routes/index.route";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", mainRouter);

const port = ENV.PORT;

app.listen(port, () => console.log("server listening on PORT", port));
