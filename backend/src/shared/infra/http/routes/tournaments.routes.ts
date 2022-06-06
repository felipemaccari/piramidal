import { Router } from "express";

import CreateTournamentController from "@modules/tournaments/useCases/createTournament/CreateTournamentController";
import EditTournamentController from "@modules/tournaments/useCases/editTournament/EditTournamentController";
import EditTournamentPlayerController from "@modules/tournaments/useCases/editTournamentPlayer/EditTournamentPlayerController";
import ListTournamentController from "@modules/tournaments/useCases/listTournament/ListTournamentController";
import ListTournamentPlayersController from "@modules/tournaments/useCases/listTournamentPlayers/ListTournamentPlayersController";
import RaffleTournamentController from "@modules/tournaments/useCases/raffleTournament/RaffleTournamentController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const tournamentsRoutes = Router();

const createTournamentController = new CreateTournamentController();
const listTournamentController = new ListTournamentController();
const raffleTournamentController = new RaffleTournamentController();
const listTournamentPlayersController = new ListTournamentPlayersController();
const editTournamentController = new EditTournamentController();
const editTournamentPlayerController = new EditTournamentPlayerController();

tournamentsRoutes.use(ensureAuthenticated);

tournamentsRoutes.post("/", createTournamentController.handle);
tournamentsRoutes.post(
  "/:tournamentID/raffle",
  raffleTournamentController.handle
);

tournamentsRoutes.get("/", listTournamentController.handle);
tournamentsRoutes.get("/:tournamentID", listTournamentPlayersController.handle);
tournamentsRoutes.put("/:tournamentID", editTournamentController.handle);
tournamentsRoutes.put(
  "/player/:tournamentPlayerID",
  editTournamentPlayerController.handle
);

export default tournamentsRoutes;
