import express from "express";
import { ENV } from "./constants/ENV";
import mainRouter from "./routes/index.route";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: ENV.clientUrl,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("tiny"));

app.use(express.json());

app.use("/api", mainRouter);

const port = ENV.PORT;

import { exec } from "child_process";

exec("df -h", (error: any, stdout: any, stderr: any) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`Disk Space Usage:\n${stdout}`);
});

app.listen(port, () => console.log("server listening on PORT", port));
