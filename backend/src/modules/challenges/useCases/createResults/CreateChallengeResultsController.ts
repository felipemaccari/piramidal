import { Request, Response } from "express";
import { container } from "tsyringe";

import ICreateChallengeResultsDTO from "@modules/challenges/dtos/ICreateChallengeResultsDTO";

import CreateChallengeResultsUseCase from "./CreateChallengeResultsUseCase";

class CreateChallengeResultsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: ICreateChallengeResultsDTO = request.body;

    const createChallengeResultsUseCase = container.resolve(
      CreateChallengeResultsUseCase
    );

    createChallengeResultsUseCase.execute(data);

    return response.status(201).send();
  }
}

export default CreateChallengeResultsController;
