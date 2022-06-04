import { Router } from "express";

import CreateTournamentController from "@modules/tournaments/useCases/createTournament/CreateTournamentController";
import ListTournamentController from "@modules/tournaments/useCases/listTournament/ListTournamentController";
import ListTournamentPlayersController from "@modules/tournaments/useCases/listTournamentPlayers/ListTournamentPlayersController";
import RaffleTournamentController from "@modules/tournaments/useCases/raffleTournament/RaffleTournamentController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const tournamentsRoutes = Router();

const createTournamentController = new CreateTournamentController();
const listTournamentController = new ListTournamentController();
const raffleTournamentController = new RaffleTournamentController();
const listTournamentPlayersController = new ListTournamentPlayersController();

tournamentsRoutes.use(ensureAuthenticated);

tournamentsRoutes.post("/", createTournamentController.handle);
tournamentsRoutes.post(
  "/:tournamentID/raffle",
  raffleTournamentController.handle
);

tournamentsRoutes.get("/", listTournamentController.handle);
tournamentsRoutes.get("/:tournamentID", listTournamentPlayersController.handle);

export default tournamentsRoutes;
