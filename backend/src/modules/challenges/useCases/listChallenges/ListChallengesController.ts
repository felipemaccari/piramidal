import { Request, Response } from "express";
import { container } from "tsyringe";

import ListChallengeUseCase from "./ListChallengeUseCase";

class ListChallengesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listChallengeUseCase = container.resolve(ListChallengeUseCase);

    const challenges = await listChallengeUseCase.execute();

    return response.status(201).json(challenges);
  }
}

export default ListChallengesController;
