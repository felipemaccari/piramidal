import { inject, injectable } from "tsyringe";

import ICreateChallengeResultsDTO from "@modules/challenges/dtos/ICreateChallengeResultsDTO";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { IChallengesResultsRepository } from "@modules/challenges/repositories/IChallengesResultsRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class CreateChallengeResultsUseCase {
  constructor(
    @inject("ChallengesResultsRepository")
    private challengeResultsRepository: IChallengesResultsRepository,
    @inject("ChallengesRepository")
    private challengeRepository: IChallengesRepository
  ) {}

  async execute(data: ICreateChallengeResultsDTO): Promise<void> {
    const { challengeID } = data;

    const challengeExists = await this.challengeRepository.findByID(
      challengeID
    );

    if (!challengeExists) {
      throw new AppError("Challenge does not exists");
    }

    await this.challengeResultsRepository.create(data);
  }
}

export default CreateChallengeResultsUseCase;
