import { inject, injectable } from "tsyringe";

import Challenge from "@modules/challenges/entities/Challenge";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";

@injectable()
class ListChallengeUseCase {
  constructor(
    @inject("ChallengesRepository")
    private challengeRepository: IChallengesRepository
  ) {}

  async execute(): Promise<Challenge[]> {
    const challenges = await this.challengeRepository.list();

    return challenges;
  }
}

export default ListChallengeUseCase;
