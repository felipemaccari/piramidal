import { Router } from "express";

import CreatePlayerController from "@modules/players/useCases/createPlayer/CreatePlayerController";
import ListPlayersController from "@modules/players/useCases/listPlayers/ListPlayersController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const playersRoutes = Router();

const createPlayerController = new CreatePlayerController();
const listPlayersController = new ListPlayersController();

playersRoutes.use(ensureAuthenticated);
playersRoutes.post("/", createPlayerController.handle);
playersRoutes.get("/", listPlayersController.handle);

export default playersRoutes;
