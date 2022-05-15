import { Router } from "express";

import CreateTournamentController from "../modules/tournaments/useCases/createTournament/CreateTournamentController";

const tournamentsRoutes = Router();

const createTournamentController = new CreateTournamentController();

tournamentsRoutes.post("/", createTournamentController.handle);

export default tournamentsRoutes;
