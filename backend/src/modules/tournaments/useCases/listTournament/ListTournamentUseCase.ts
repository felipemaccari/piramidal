import { inject, injectable } from "tsyringe";

import Tournament from "../../entities/Tournament";
import ITournamentsRepository from "../../repositories/ITournamentsRepository";

@injectable()
class ListTournamentUseCase {
  constructor(
    @inject("TournamentsRepository")
    private tournamentsRepository: ITournamentsRepository
  ) {}

  async execute(): Promise<Tournament[]> {
    const tournaments = await this.tournamentsRepository.list();

    return tournaments;
  }
}

export default ListTournamentUseCase;
