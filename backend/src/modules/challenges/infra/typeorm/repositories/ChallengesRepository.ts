import { Repository } from "typeorm";

import ICreateChallengeDTO from "@modules/challenges/dtos/ICreateChallengeDTO";
import Challenge from "@modules/challenges/infra/typeorm/entities/Challenge";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import AppDataSource from "@shared/infra/typeorm";

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

  async findByID(id: string): Promise<Challenge> {
    const challenge = await this.repository.findOneBy({ id });

    return challenge;
  }

  async findByDestinationPlayerID(
    destinationPlayerID: string
  ): Promise<Challenge[]> {
    const challenges = await this.repository.findBy({ destinationPlayerID });

    return challenges;
  }
}

export default ChallengesRepository;
