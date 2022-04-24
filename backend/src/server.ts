import dotenv from "dotenv";
import express from "express";

import { logger } from "../utils/logger";
import router from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use(router);

app.listen(process.env.PORT, () =>
  logger.info(`Server started at ${process.env.PORT}`)
);
