import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateChallengeUseCase from "@modules/challenges/useCases/createChallenge/CreateChallengeUseCase";

class CreateChallengeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      challengeePlayer,
      challengedPlayer,
      initialDate,
      finalDate,
      gameDate,
      challengeeGiveup,
      challengedGiveup,
      refused,
      expired,
      challengeeFirstSet,
      challengedFirstSet,
      challengeeSecondSet,
      challengedSecondSet,
      challengeeTiebreak,
      challengedTiebreak,
      challengeePoints,
      challengedPoints,
    } = request.body;

    const createChallengeUseCase = container.resolve(CreateChallengeUseCase);

    createChallengeUseCase.execute({
      challengeePlayer,
      challengedPlayer,
      initialDate,
      finalDate,
      gameDate,
      challengeeGiveup,
      challengedGiveup,
      refused,
      expired,
      challengeeFirstSet,
      challengedFirstSet,
      challengeeSecondSet,
      challengedSecondSet,
      challengeeTiebreak,
      challengedTiebreak,
      challengeePoints,
      challengedPoints,
    });

    return response.status(201).send();
  }
}

export default CreateChallengeController;
