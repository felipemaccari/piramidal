import { inject, injectable } from "tsyringe";

import ICreateChallengeDTO from "@modules/challenges/dtos/ICreateChallengeDTO";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";

@injectable()
class CreateChallengeUseCase {
  constructor(
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository
  ) {}

  async execute(data: ICreateChallengeDTO): Promise<void> {
    await this.challengesRepository.create(data);
  }
}

export default CreateChallengeUseCase;
