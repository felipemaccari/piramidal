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

  activeTournaments(tournaments) {
    return tournaments.filter((tournament) => !tournament.deletedAt);
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

    const activeTournaments = this.activeTournaments(tournaments);

    return activeTournaments;
  }

  async findByID(id: string): Promise<Tournament> {
    const tournament = await this.repository.findOneBy({ id });

    if (tournament.deletedAt) {
      return;
    }

    return tournament;
  }

  async edit({
    description,
    initialDate,
    finalDate,
    active,
    finished,
    tournamentID,
    deletedAt,
  }: IEditTournamentDTO): Promise<void> {
    await this.repository.update(tournamentID, {
      description,
      initialDate,
      finalDate,
      active,
      finished,
      deletedAt,
    });
  }

  async findActive(): Promise<Tournament> {
    const openedTournaments = await this.repository.findBy({
      finished: false,
    });

    const activeTournaments = await this.activeTournaments(openedTournaments);

    return activeTournaments[0];
  }

  async delete(tournamentID: string): Promise<void> {
    await this.repository.delete(tournamentID);
  }
}

export default TournamentsRepository;
