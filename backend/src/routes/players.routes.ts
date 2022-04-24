import { Router } from "express";

import createPlayerController from "../modules/players/useCases/createPlayer";

const playersRoutes = Router();

playersRoutes.post("/", (request, response) =>
  createPlayerController.handle(request, response)
);

playersRoutes.get("/", (request, response) => {
  const players = playersRepository.list();

  return response.status(201).json(players);
});

export default playersRoutes;
