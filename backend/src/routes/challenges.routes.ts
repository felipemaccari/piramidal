import { Router } from "express";

import CreateChallengeController from "../modules/challenges/useCases/createChallenge/CreateChallengeController";
import ListChallengesController from "../modules/challenges/useCases/listChallenges/ListChallengesController";

const challengesRoutes = Router();

const createChallengeController = new CreateChallengeController();
const listChallengesController = new ListChallengesController();

challengesRoutes.post("/", createChallengeController.handle);
challengesRoutes.get("/", listChallengesController.handle);

export default challengesRoutes;
