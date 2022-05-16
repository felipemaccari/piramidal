import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import "express-async-errors";
import { AppDataSource } from "./database";
import AppError from "./errors/AppError";
import router from "./routes";
import swaggerFile from "./swagger.json";
import "./shared/container";

AppDataSource.initialize()
  .then(async () => {
    dotenv.config();

    const app = express();

    app.use(express.json());

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

    app.use(router);

    app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({ message: err.message });
        }

        return response.status(500).json({
          status: "error",
          message: `Internal server error => ${err.message}`,
        });
      }
    );

    app.listen(process.env.PORT, () =>
      console.log(`server running at ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));
