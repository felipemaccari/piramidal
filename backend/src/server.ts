import dotenv from "dotenv";
import express from "express";

import { logger } from "../utils/logger";
import playersRoutes from "./routes/players.routes";
import usersRoutes from "./routes/users.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/players", playersRoutes);
app.use("/users", usersRoutes);

app.listen(process.env.PORT, () =>
  logger.info(`Server started at ${process.env.PORT}`)
);
