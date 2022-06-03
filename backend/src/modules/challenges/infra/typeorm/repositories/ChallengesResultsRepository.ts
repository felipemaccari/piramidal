import { Repository } from "typeorm";

import ICreateChallengeResultsDTO from "@modules/challenges/dtos/ICreateChallengeResultsDTO";
import { IChallengesResultsRepository } from "@modules/challenges/repositories/IChallengesResultsRepository";
import AppDataSource from "@shared/infra/typeorm";

import ChallengeResults from "../entities/ChallengeResults";

class ChallengesResultsRepository implements IChallengesResultsRepository {
  private repository: Repository<ChallengeResults>;

  constructor() {
    this.repository = AppDataSource.getRepository(ChallengeResults);
  }

  listById(id: string): Promise<ChallengeResults> {
    const challengeResults = this.repository.findOneBy({ id });

    return challengeResults;
  }

  async create(data: ICreateChallengeResultsDTO): Promise<void> {
    const challengeResults = await this.repository.create(data);

    await this.repository.save(challengeResults);
  }
}

export default ChallengesResultsRepository;
