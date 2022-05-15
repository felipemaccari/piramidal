import { Router } from "express";

import CreateTournamentController from "../modules/tournaments/useCases/createTournament/CreateTournamentController";
import ListTournamentController from "../modules/tournaments/useCases/listTournament/ListTournamentController";

const tournamentsRoutes = Router();

const createTournamentController = new CreateTournamentController();
const listTournamentController = new ListTournamentController();

tournamentsRoutes.post("/", createTournamentController.handle);
tournamentsRoutes.get("/", listTournamentController.handle);

export default tournamentsRoutes;
