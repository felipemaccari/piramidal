import { Router } from "express";

import createUserController from "../modules/users/useCases/createUser";
import listUsersController from "../modules/users/useCases/listUsers";

const usersRoutes = Router();

usersRoutes.get("/", (request, response) =>
  listUsersController.handle(request, response)
);

usersRoutes.post("/", (request, response) =>
  createUserController.handle(request, response)
);

export default usersRoutes;
