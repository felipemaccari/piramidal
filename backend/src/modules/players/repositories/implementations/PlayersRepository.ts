import { Repository } from "typeorm";

import AppDataSource from "@database/databaseMigrationRun";
import ICreatePlayerDTO from "@modules/players/dtos/ICreatePlayerDTO";
import Player from "@modules/players/entities/Player";
import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";

class PlayersRepository implements IPlayersRepository {
  private repository: Repository<Player>;

  constructor() {
    this.repository = AppDataSource.getRepository(Player);
  }

  async create({ name, phone }: ICreatePlayerDTO): Promise<void> {
    const player = await this.repository.create({ name, phone });

    await this.repository.save(player);
  }

  async list(): Promise<Player[]> {
    const players = await this.repository.find();

    return players;
  }

  async findByName(name: string): Promise<Player> {
    const player = await this.repository.findOneBy({ name });

    return player;
  }
}

export default PlayersRepository;
