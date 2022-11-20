import { Router } from "express";

import CreateTournamentController from "@modules/tournaments/useCases/createTournament/CreateTournamentController";
import CreateTournamentPlayerController from "@modules/tournaments/useCases/createTournamentPlayer/CreateTournamentPlayerController";
import EditTournamentController from "@modules/tournaments/useCases/editTournament/EditTournamentController";
import EditTournamentPlayerController from "@modules/tournaments/useCases/editTournamentPlayer/EditTournamentPlayerController";
import ListActiveTournamentController from "@modules/tournaments/useCases/listActiveTournament/ListActiveTournamentController";
import ListTournamentController from "@modules/tournaments/useCases/listTournament/ListTournamentController";
import ListTournamentPlayersController from "@modules/tournaments/useCases/listTournamentPlayers/ListTournamentPlayersController";
import ListTournamentResultsController from "@modules/tournaments/useCases/listTournamentResults/ListTournamentResultsController";
import RaffleTournamentController from "@modules/tournaments/useCases/raffleTournament/RaffleTournamentController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const tournamentsRoutes = Router();

const createTournamentController = new CreateTournamentController();
const createTournamentPlayerController = new CreateTournamentPlayerController();
const editTournamentController = new EditTournamentController();
const editTournamentPlayerController = new EditTournamentPlayerController();
const listTournamentController = new ListTournamentController();
const listTournamentPlayersController = new ListTournamentPlayersController();
const raffleTournamentController = new RaffleTournamentController();
const listActiveTournamentController = new ListActiveTournamentController();
const listTournamentResultsController = new ListTournamentResultsController();

tournamentsRoutes.post(
  "/",
  ensureAuthenticated,
  createTournamentController.handle
);
tournamentsRoutes.post(
  "/:tournamentID/raffle",
  ensureAuthenticated,
  raffleTournamentController.handle
);
tournamentsRoutes.post(
  "/player/:tournamentID",
  ensureAuthenticated,
  createTournamentPlayerController.handle
);

tournamentsRoutes.get("/", listTournamentController.handle);
tournamentsRoutes.get("/active", listActiveTournamentController.handle);
tournamentsRoutes.get(
  "/:tournamentID/results",
  listTournamentResultsController.handle
);
tournamentsRoutes.get("/:tournamentID", listTournamentPlayersController.handle);

tournamentsRoutes.put(
  "/:tournamentID",
  ensureAuthenticated,
  editTournamentController.handle
);
tournamentsRoutes.put(
  "/player/:tournamentPlayerID",
  ensureAuthenticated,
  editTournamentPlayerController.handle
);

export default tournamentsRoutes;
