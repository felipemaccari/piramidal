import { inject, injectable } from "tsyringe";

import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class DeleteTournamentUseCase {
  constructor(
    @inject("TournamentsRepository")
    private tournamentsRepository: ITournamentsRepository,
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository
  ) {}

  async execute(tournamentID: string): Promise<void> {
    const tournament = await this.tournamentsRepository.findByID(tournamentID);

    if (!tournament) {
      throw new AppError("This tournament does not exists");
    }

    const challenges = await this.challengesRepository.findByTournamentID(
      tournamentID
    );

    if (challenges.length) {
      await this.tournamentsRepository.edit({
        ...tournament,
        tournamentID: tournament.id,
        deletedAt: new Date(),
      });

      return;
    }

    await this.tournamentsRepository.delete(tournamentID);
  }
}

export default DeleteTournamentUseCase;
