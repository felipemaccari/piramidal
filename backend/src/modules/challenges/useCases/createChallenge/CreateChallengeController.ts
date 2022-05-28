import { Request, Response } from "express";
import { container } from "tsyringe";

import ICreateChallengeDTO from "@modules/challenges/dtos/ICreateChallengeDTO";
import CreateChallengeUseCase from "@modules/challenges/useCases/createChallenge/CreateChallengeUseCase";

class CreateChallengeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: ICreateChallengeDTO = request.body;

    const createChallengeUseCase = container.resolve(CreateChallengeUseCase);

    createChallengeUseCase.execute(data);

    return response.status(201).send();
  }
}

export default CreateChallengeController;
