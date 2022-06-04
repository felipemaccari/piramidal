import { Router } from "express";

import CreateChallengeController from "@modules/challenges/useCases/createChallenge/CreateChallengeController";
import CreateChallengeResultsController from "@modules/challenges/useCases/createResults/CreateChallengeResultsController";
import ListChallengesController from "@modules/challenges/useCases/listChallenges/ListChallengesController";
import ListResultsByChallengeController from "@modules/challenges/useCases/listResultsByChallenge/ListResultsByChallengeController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const challengesRoutes = Router();

const createChallengeController = new CreateChallengeController();
const createChallengeResultsController = new CreateChallengeResultsController();
const listChallengesController = new ListChallengesController();
const listResultsByChallengeController = new ListResultsByChallengeController();

challengesRoutes.use(ensureAuthenticated);
challengesRoutes.post("/", createChallengeController.handle);
challengesRoutes.get("/", listChallengesController.handle);
challengesRoutes.post(
  "/results/:challengeID",
  createChallengeResultsController.handle
);
challengesRoutes.get(
  "/results/:challengeID",
  listResultsByChallengeController.handle
);

export default challengesRoutes;
