import express from "express";
import { ENV } from "./constants/ENV";
import mainRouter from "./routes/index.route";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("tiny"));

app.use(express.json());

app.use("/api", mainRouter);

const port = ENV.PORT;

app.listen(port, () => console.log("server listening on PORT", port));
