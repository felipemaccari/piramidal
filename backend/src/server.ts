import dotenv from "dotenv";
import express from "express";

import { logger } from "../utils/logger";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  return response.json("here we go");
});

app.listen(process.env.PORT, () =>
  logger.info(`Server started at ${process.env.PORT}`)
);
