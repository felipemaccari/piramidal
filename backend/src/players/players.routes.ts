import { Router } from "express";

const playersRoutes = Router();

const players = [];

playersRoutes.post("/players", (request, response) => {
  const { name, phone } = request.body;

  players.push({ name, phone });

  return response.status(201).json(players);
});

export { playersRoutes };
