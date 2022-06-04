import { Request, Response } from "express";
import { container } from "tsyringe";

import ListResultsByChallengeUseCase from "./ListResultsByChallengeUseCase";

class ListResultsByChallengeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { challengeID } = request.params;

    const listResultsByChallengeUseCase = container.resolve(
      ListResultsByChallengeUseCase
    );

    const challengeResults = await listResultsByChallengeUseCase.execute(
      challengeID
    );

    return response.status(201).json(challengeResults);
  }
}

export default ListResultsByChallengeController;
