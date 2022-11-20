import { Repository } from "typeorm";

import ICreateChallengeResultsDTO from "@modules/challenges/dtos/ICreateChallengeResultsDTO";
import { IChallengesResultsRepository } from "@modules/challenges/repositories/IChallengesResultsRepository";
import AppDataSource from "@shared/infra/typeorm";

import Challenge from "../entities/Challenge";
import ChallengeResults from "../entities/ChallengeResults";

class ChallengesResultsRepository implements IChallengesResultsRepository {
  private repository: Repository<ChallengeResults>;

  constructor() {
    this.repository = AppDataSource.getRepository(ChallengeResults);
  }

  async list(): Promise<ChallengeResults[]> {
    const challengeResults = await this.repository.find();

    return challengeResults;
  }

  async listByID(id: string): Promise<ChallengeResults> {
    const challengeResults = await this.repository.findOneBy({ id });

    return challengeResults;
  }

  async create(data: ICreateChallengeResultsDTO): Promise<void> {
    const challengeResults = await this.repository.create(data);

    await this.repository.save(challengeResults);
  }

  async listByChallengeID(challengeID: string): Promise<ChallengeResults> {
    const challengeResults = await this.repository.findOneBy({
      challengeID,
    });

    return challengeResults;
  }

  async listByChallengesIDS(
    challenges: Array<Challenge>
  ): Promise<ChallengeResults[]> {
    const challengeResults = Promise.all(
      challenges.map(
        async (challenge) =>
          await this.repository.findOneBy({
            challengeID: challenge.id,
          })
      )
    );

    return challengeResults;
  }
}

export default ChallengesResultsRepository;
