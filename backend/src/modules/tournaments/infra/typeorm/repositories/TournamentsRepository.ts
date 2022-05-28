import { Repository } from "typeorm";

import ICreateTournamentDTO from "@modules/tournaments/dtos/ICreateTournamentDTO";
import Tournament from "@modules/tournaments/infra/typeorm/entities/Tournament";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";
import AppDataSource from "@shared/infra/typeorm";

class TournamentsRepository implements ITournamentsRepository {
  private repository: Repository<Tournament>;

  constructor() {
    this.repository = AppDataSource.getRepository(Tournament);
  }

  async create({
    description,
    initialDate,
    finalDate,
  }: ICreateTournamentDTO): Promise<void> {
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
