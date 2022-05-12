import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import Challenge from "../../entities/Challenge";
import {
  IChallengesRepository,
  ICreateChallengeDTO,
} from "../IChallengesRepository";

class ChallengesRepository implements IChallengesRepository {
  private repository: Repository<Challenge>;

  constructor() {
    this.repository = AppDataSource.getRepository(Challenge);
  }

  async list(): Promise<Challenge[]> {
    const challenges = await this.repository.find();

    return challenges;
  }

  async create({
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
    const challenge = await this.repository.create({
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

    await this.repository.save(challenge);
  }
}

export default ChallengesRepository;
