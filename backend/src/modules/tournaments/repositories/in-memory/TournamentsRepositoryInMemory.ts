import ICreateTournamentDTO from "@modules/tournaments/dtos/ICreateTournamentDTO";
import Tournament from "@modules/tournaments/infra/typeorm/entities/Tournament";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";

class TournamentsRepositoryInMemory implements ITournamentsRepository {
  tournaments: Tournament[] = [];

  async create({
    description,
    initialDate,
    finalDate,
  }: ICreateTournamentDTO): Promise<void> {
    const tournament = new Tournament();

    Object.assign(tournament, { description, initialDate, finalDate });

    this.tournaments.push(tournament);
  }

  async list(): Promise<Tournament[]> {
    return this.tournaments;
  }

  async findById(id: string): Promise<Tournament> {
    const tournament = this.tournaments.find(
      (tournament) => tournament.id === id
    );

    return tournament;
  }
}

export default TournamentsRepositoryInMemory;
