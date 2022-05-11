import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import Player from "../../entities/Player";
import { IPlayersRepository, ICreatePlayerDTO } from "../IPlayersRepository";

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
