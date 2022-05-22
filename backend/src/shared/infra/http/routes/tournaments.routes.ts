import { Router } from "express";

import CreateTournamentController from "@modules/tournaments/useCases/createTournament/CreateTournamentController";
import ListTournamentController from "@modules/tournaments/useCases/listTournament/ListTournamentController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const tournamentsRoutes = Router();

const createTournamentController = new CreateTournamentController();
const listTournamentController = new ListTournamentController();

tournamentsRoutes.use(ensureAuthenticated);
tournamentsRoutes.post("/", createTournamentController.handle);
tournamentsRoutes.get("/", listTournamentController.handle);

export default tournamentsRoutes;
