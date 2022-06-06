import { inject, injectable } from "tsyringe";

import IEditTournamentPlayerDTO from "@modules/tournaments/dtos/IEditTournamentPlayerDTO";
import ITournamentsPlayersRepository from "@modules/tournaments/repositories/ITournamentsPlayersRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class EditTournamentPlayerUseCase {
  constructor(
    @inject("TournamentsPlayersRepository")
    private tournamentsPlayersRepository: ITournamentsPlayersRepository
  ) {}

  async execute(data: IEditTournamentPlayerDTO): Promise<void> {
    const tournamentPlayer =
      await this.tournamentsPlayersRepository.findTournamentPlayerByID(data.id);

    if (!tournamentPlayer) {
      throw new AppError("Tournament player not found");
    }

    await this.tournamentsPlayersRepository.editTournamentPlayer(data);
  }
}

export default EditTournamentPlayerUseCase;
