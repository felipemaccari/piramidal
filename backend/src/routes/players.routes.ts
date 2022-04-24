import { Router } from "express";

import createPlayerController from "../modules/players/useCases/createPlayer";
import listPlayersController from "../modules/players/useCases/listPlayers";

const playersRoutes = Router();

playersRoutes.post("/", (request, response) =>
  createPlayerController.handle(request, response)
);

playersRoutes.get("/", (request, response) =>
  listPlayersController.handle(request, response)
);

export default playersRoutes;
