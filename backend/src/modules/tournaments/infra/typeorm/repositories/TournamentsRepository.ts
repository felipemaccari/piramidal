import { Repository } from "typeorm";

import ICreateTournamentDTO from "@modules/tournaments/dtos/ICreateTournamentDTO";
import IEditTournamentDTO from "@modules/tournaments/dtos/IEditTournamentDTO";
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
  }: ICreateTournamentDTO): Promise<Tournament> {
    const tournament = await this.repository.create({
      description,
      initialDate,
      finalDate,
    });

    const createdTournament = await this.repository.save(tournament);

    return createdTournament;
  }

  async list(): Promise<Tournament[]> {
    const tournaments = await this.repository.find();

    return tournaments;
  }

  async findByID(id: string): Promise<Tournament> {
    const tournament = await this.repository.findOneBy({ id });

    return tournament;
  }

  async edit({
    description,
    initialDate,
    finalDate,
    active,
    finished,
    tournamentID,
  }: IEditTournamentDTO): Promise<void> {
    await this.repository.update(tournamentID, {
      description,
      initialDate,
      finalDate,
      active,
      finished,
    });
  }

  async findActive(): Promise<Tournament> {
    const activeTournament = await this.repository.findOneBy({
      finished: false,
    });

    return activeTournament;
  }
}

export default TournamentsRepository;
