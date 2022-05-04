import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { logger } from "../utils/logger";
import router from "./routes";
import swaggerFile from "./swagger.json";

import "./database";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.listen(process.env.PORT, () =>
  logger.info(`Server started at ${process.env.PORT}`)
);
