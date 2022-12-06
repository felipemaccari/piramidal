import { Router } from "express";

import CreateChallengeController from "@modules/challenges/useCases/createChallenge/CreateChallengeController";
import CreateChallengeResultsController from "@modules/challenges/useCases/createResults/CreateChallengeResultsController";
import ListAvaliableDestinationUserController from "@modules/challenges/useCases/listAvaliableDestinationUser/ListAvaliableDestinationUserController";
import ListChallengesController from "@modules/challenges/useCases/listChallenges/ListChallengesController";
import ListChallengesByTournamentController from "@modules/challenges/useCases/listChallengesByTournament/ListChallengesByTournamentController";
import ListResultsByChallengeController from "@modules/challenges/useCases/listResultsByChallenge/ListResultsByChallengeController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const challengesRoutes = Router();

const createChallengeController = new CreateChallengeController();
const createChallengeResultsController = new CreateChallengeResultsController();
const listChallengesController = new ListChallengesController();
const listResultsByChallengeController = new ListResultsByChallengeController();
const listChallengesByTournament = new ListChallengesByTournamentController();
const listAvaliableDestinationUserController =
  new ListAvaliableDestinationUserController();

challengesRoutes.use(ensureAuthenticated);
challengesRoutes.post("/", createChallengeController.handle);
challengesRoutes.get("/", listChallengesController.handle);
challengesRoutes.get(
  "/player-avaliable/:playerID/:tournamentID",
  listAvaliableDestinationUserController.handle
);
challengesRoutes.get(
  "/tournament/:tournamentID",
  listChallengesByTournament.handle
);
challengesRoutes.post(
  "/results/:challengeID",
  createChallengeResultsController.handle
);
challengesRoutes.get(
  "/results/:challengeID",
  listResultsByChallengeController.handle
);

export default challengesRoutes;
