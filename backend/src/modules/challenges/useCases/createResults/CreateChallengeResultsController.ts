import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateChallengeResultsUseCase from "./CreateChallengeResultsUseCase";

class CreateChallengeResultsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { challengeID } = request.params;

    const data = request.body;

    const createChallengeResultsUseCase = container.resolve(
      CreateChallengeResultsUseCase
    );

    createChallengeResultsUseCase.execute({ ...data, challengeID });

    return response.status(201).send();
  }
}

export default CreateChallengeResultsController;
