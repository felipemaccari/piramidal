import { createQueryBuilder, Repository } from "typeorm";

import Player from "@modules/players/infra/typeorm/entities/Player";
import ICreateTournamentPlayerDTO from "@modules/tournaments/dtos/ICreateTournamentPlayerDTO";
import IEditTournamentPlayerDTO from "@modules/tournaments/dtos/IEditTournamentPlayerDTO";
import ITournamentsPlayersRepository from "@modules/tournaments/repositories/ITournamentsPlayersRepository";
import AppDataSource from "@shared/infra/typeorm";

import TournamentPlayer from "../entities/TournamentPlayer";

class TournamentsPlayersRepository implements ITournamentsPlayersRepository {
  private repository: Repository<TournamentPlayer>;

  constructor() {
    this.repository = AppDataSource.getRepository(TournamentPlayer);
  }

  async findTournamentPlayerByID(id: string): Promise<TournamentPlayer> {
    const tournamentPlayer = await this.repository.findOneBy({ id });

    return tournamentPlayer;
  }

  async editTournamentPlayer(player: IEditTournamentPlayerDTO): Promise<void> {
    await this.repository.update(player.id, player);
  }

  async findByTournamentID(tournamentID: string): Promise<TournamentPlayer[]> {
    const tournamentPlayers = await this.repository.findBy({ tournamentID });

    return tournamentPlayers;
  }

  async create(data: ICreateTournamentPlayerDTO): Promise<void> {
    const tournamentPlayer = await this.repository.create(data);

    await this.repository.save(tournamentPlayer);
  }
}

export default TournamentsPlayersRepository;
