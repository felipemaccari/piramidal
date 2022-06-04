import { inject, injectable } from "tsyringe";

import ChallengeResults from "@modules/challenges/infra/typeorm/entities/ChallengeResults";
import { IChallengesResultsRepository } from "@modules/challenges/repositories/IChallengesResultsRepository";

@injectable()
class ListResultsByChallengeUseCase {
  constructor(
    @inject("ChallengesResultsRepository")
    private challengeResultsRepository: IChallengesResultsRepository
  ) {}

  async execute(challengeID: string): Promise<ChallengeResults> {
    const challengeResults =
      await this.challengeResultsRepository.listByChallengeID(challengeID);

    return challengeResults;
  }
}

export default ListResultsByChallengeUseCase;
