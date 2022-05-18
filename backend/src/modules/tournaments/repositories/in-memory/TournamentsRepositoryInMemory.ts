import Tournament from "../../entities/Tournament";
import ITournamentsRepository from "../ITournamentsRepository";

class TournamentsRepositoryInMemory implements ITournamentsRepository {
  tournaments: Tournament[] = [];

  async create({
    description,
    initialDate,
    finalDate,
  }: {
    description: any;
    initialDate: any;
    finalDate: any;
  }): Promise<void> {
    const tournament = new Tournament();

    Object.assign(tournament, { description, initialDate, finalDate });

    this.tournaments.push(tournament);
  }

  async list(): Promise<Tournament[]> {
    return this.tournaments;
  }

  async findById({ id }: { id: any }): Promise<Tournament> {
    const tournament = this.tournaments.find(
      (tournament) => tournament.id === id
    );

    return tournament;
  }
}

export default TournamentsRepositoryInMemory;
