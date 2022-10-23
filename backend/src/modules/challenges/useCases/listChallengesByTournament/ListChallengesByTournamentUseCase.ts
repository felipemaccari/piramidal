import { inject, injectable } from "tsyringe";

import Challenge from "@modules/challenges/infra/typeorm/entities/Challenge";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";

@injectable()
class ListChallengesByTournamentUseCase {
  constructor(
    @inject("ChallengesRepository")
    private challengeRepository: IChallengesRepository
  ) {}

  async execute(tournamentID: string): Promise<Challenge[]> {
    const challenges = await this.challengeRepository.findByTournamentID(
      tournamentID
    );

    return challenges;
  }
}

export default ListChallengesByTournamentUseCase;
