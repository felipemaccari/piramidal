import { Repository } from "typeorm";

import AppDataSource from "@database/databaseMigrationRun";
import Tournament from "@modules/tournaments/entities/Tournament";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";

class TournamentsRepository implements ITournamentsRepository {
  private repository: Repository<Tournament>;

  constructor() {
    this.repository = AppDataSource.getRepository(Tournament);
  }

  async create({ description, initialDate, finalDate }): Promise<void> {
    const tournament = await this.repository.create({
      description,
      initialDate,
      finalDate,
    });

    await this.repository.save(tournament);
  }

  async list(): Promise<Tournament[]> {
    const tournaments = await this.repository.find();

    return tournaments;
  }

  async findById(id: string): Promise<Tournament> {
    const tournament = await this.repository.findOneBy({ id });

    return tournament;
  }
}

export default TournamentsRepository;
