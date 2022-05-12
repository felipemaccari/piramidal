import { Router } from "express";

import CreateChallengeController from "../modules/challenges/useCases/createChallenge/CreateChallengeController";

const challengesRoutes = Router();

const createChallengeController = new CreateChallengeController();

challengesRoutes.post("/", createChallengeController.handle);

export default challengesRoutes;
