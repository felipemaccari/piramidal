import { inject, injectable } from "tsyringe";

import ITournamentsRepository from "../../repositories/ITournamentsRepository";

@injectable()
class CreateTournamentUseCase {
  constructor(
    @inject("TournamentsRepository")
    private tournamentsController: ITournamentsRepository
  ) {}

  async execute({ description, initialDate, finalDate }): Promise<void> {
    const tournament = { description, initialDate, finalDate };

    this.tournamentsController.create(tournament);
  }
}

export default CreateTournamentUseCase;
