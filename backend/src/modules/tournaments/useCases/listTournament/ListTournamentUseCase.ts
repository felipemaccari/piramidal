import { inject, injectable } from "tsyringe";

import Tournament from "@modules/tournaments/infra/typeorm/entities/Tournament";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";

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
