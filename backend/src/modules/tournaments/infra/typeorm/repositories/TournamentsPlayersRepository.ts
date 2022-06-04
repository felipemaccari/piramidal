import { Repository } from "typeorm";

import ICreateTournamentPlayerDTO from "@modules/tournaments/dtos/ICreateTournamentPlayerDTO";
import ITournamentsPlayersRepository from "@modules/tournaments/repositories/ITournamentsPlayersRepository";
import AppDataSource from "@shared/infra/typeorm";

import TournamentPlayer from "../entities/TournamentPlayer";

class TournamentsPlayersRepository implements ITournamentsPlayersRepository {
  private repository: Repository<TournamentPlayer>;

  constructor() {
    this.repository = AppDataSource.getRepository(TournamentPlayer);
  }

  async create(data: ICreateTournamentPlayerDTO): Promise<void> {
    const tournamentPlayer = await this.repository.create(data);

    await this.repository.save(tournamentPlayer);
  }

  async list(): Promise<TournamentPlayer[]> {
    const tournamentsPlayers = await this.repository.find();

    return tournamentsPlayers;
  }
}

export default TournamentsPlayersRepository;
