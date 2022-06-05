import { inject, injectable } from "tsyringe";

import IEditTournamentDTO from "@modules/tournaments/dtos/IEditTournamentDTO";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class EditTournamentUseCase {
  constructor(
    @inject("TournamentsRepository")
    private tournamentsRepository: ITournamentsRepository
  ) {}

  async execute(data: IEditTournamentDTO): Promise<void> {
    const tournament = await this.tournamentsRepository.findByID(
      data.tournamentID
    );

    if (!tournament) {
      throw new AppError("Tournament not found");
    }

    await this.tournamentsRepository.edit(data);
  }
}

export default EditTournamentUseCase;
