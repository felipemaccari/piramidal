import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import CreateUserController from "../modules/accounts/useCases/createUser/CreateUserController";
import ListUsersController from "../modules/accounts/useCases/listUsers/ListUsersController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRoutes.use(ensureAuthenticated);
usersRoutes.get("/", listUsersController.handle);
usersRoutes.post("/", createUserController.handle);

export default usersRoutes;
