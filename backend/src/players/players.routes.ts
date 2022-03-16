import { Router } from "express";
import { v4 as uuid } from "uuid";

const playersRoutes = Router();

const players = [];

playersRoutes.post("/", (request, response) => {
  const { name, phone } = request.body;

  const player = { id: uuid(), name, phone };

  players.push(player);

  return response.status(201).json(players);
});

export { playersRoutes };
