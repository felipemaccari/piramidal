import { inject, injectable } from "tsyringe";

import {
  IChallengesRepository,
  ICreateChallengeDTO,
} from "../../repositories/IChallengesRepository";

@injectable()
class CreateChallengeUseCase {
  constructor(
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository
  ) {}

  async execute({
    challengeePlayer,
    challengedPlayer,
    initialDate,
    finalDate,
    gameDate,
    challengeeGiveup,
    challengedGiveup,
    refused,
    expired,
    challengeeFirstSet,
    challengedFirstSet,
    challengeeSecondSet,
    challengedSecondSet,
    challengeeTiebreak,
    challengedTiebreak,
    challengeePoints,
    challengedPoints,
  }: ICreateChallengeDTO): Promise<void> {
    await this.challengesRepository.create({
      challengeePlayer,
      challengedPlayer,
      initialDate,
      finalDate,
      gameDate,
      challengeeGiveup,
      challengedGiveup,
      refused,
      expired,
      challengeeFirstSet,
      challengedFirstSet,
      challengeeSecondSet,
      challengedSecondSet,
      challengeeTiebreak,
      challengedTiebreak,
      challengeePoints,
      challengedPoints,
    });
  }
}

export default CreateChallengeUseCase;
