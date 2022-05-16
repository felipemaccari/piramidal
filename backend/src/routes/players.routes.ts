import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import CreatePlayerController from "../modules/players/useCases/createPlayer/CreatePlayerController";
import ListPlayersController from "../modules/players/useCases/listPlayers/ListPlayersController";

const playersRoutes = Router();

const createPlayerController = new CreatePlayerController();
const listPlayersController = new ListPlayersController();

playersRoutes.use(ensureAuthenticated);
playersRoutes.post("/", createPlayerController.handle);
playersRoutes.get("/", listPlayersController.handle);

export default playersRoutes;
