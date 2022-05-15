import { Router } from "express";

import AuthentitcateUserController from "../modules/accounts/useCases/authenticateUser/AuthentitcateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthentitcateUserController();

authenticateRoutes.post("/session", authenticateUserController.handle);

export default authenticateRoutes;
