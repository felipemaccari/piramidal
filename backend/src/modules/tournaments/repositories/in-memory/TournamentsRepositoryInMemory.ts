import Tournament from "@modules/tournaments/entities/Tournament";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";

class TournamentsRepositoryInMemory implements ITournamentsRepository {
  tournaments: Tournament[] = [];

  async create({
    description,
    initialDate,
    finalDate,
  }: {
    description: string;
    initialDate: Date;
    finalDate: Date;
  }): Promise<void> {
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
