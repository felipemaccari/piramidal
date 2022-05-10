import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { AppDataSource } from "./database";
import router from "./routes";
import swaggerFile from "./swagger.json";

AppDataSource.initialize()
  .then(async () => {
    dotenv.config();

    const app = express();

    app.use(express.json());

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

    app.use(router);

    app.listen(process.env.PORT, () =>
      console.log(`server running at ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));
