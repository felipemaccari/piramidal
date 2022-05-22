import { inject, injectable } from "tsyringe";

import ICreateTournamentDTO from "@modules/tournaments/dtos/ICreateTournamentDTO";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";

@injectable()
class CreateTournamentUseCase {
  constructor(
    @inject("TournamentsRepository")
    private tournamentsController: ITournamentsRepository
  ) {}

  async execute({
    description,
    initialDate,
    finalDate,
  }: ICreateTournamentDTO): Promise<void> {
    const tournament = { description, initialDate, finalDate };

    this.tournamentsController.create(tournament);
  }
}

export default CreateTournamentUseCase;
