import express from "express";
import { ENV } from "./constants/ENV";

const app = express();

const port = ENV.PORT;

app.listen(port, () => console.log("server listening on PORT", port));
