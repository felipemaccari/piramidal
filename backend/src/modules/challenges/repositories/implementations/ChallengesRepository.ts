import { Repository } from "typeorm";

import AppDataSource from "@database/databaseMigrationRun";
import ICreateChallengeDTO from "@modules/challenges/dtos/ICreateChallengeDTO";
import Challenge from "@modules/challenges/entities/Challenge";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";

class ChallengesRepository implements IChallengesRepository {
  private repository: Repository<Challenge>;

  constructor() {
    this.repository = AppDataSource.getRepository(Challenge);
  }

  async list(): Promise<Challenge[]> {
    const challenges = await this.repository.find();

    return challenges;
  }

  async create(data: ICreateChallengeDTO): Promise<void> {
    const challenge = await this.repository.create(data);

    await this.repository.save(challenge);
  }
}

export default ChallengesRepository;
