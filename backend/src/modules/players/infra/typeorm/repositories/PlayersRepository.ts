import { Repository } from "typeorm";

import ICreatePlayerDTO from "@modules/players/dtos/ICreatePlayerDTO";
import IEditPlayerDTO from "@modules/players/dtos/IEditPlayerDTO";
import Player from "@modules/players/infra/typeorm/entities/Player";
import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";
import AppDataSource from "@shared/infra/typeorm";

class PlayersRepository implements IPlayersRepository {
  private repository: Repository<Player>;

  constructor() {
    this.repository = AppDataSource.getRepository(Player);
  }

  async create({ name, phone, active }: ICreatePlayerDTO): Promise<void> {
    const player = await this.repository.create({ name, phone, active });

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

  async findByID(id: string): Promise<Player> {
    const player = await this.repository.findOneBy({ id });

    return player;
  }

  async edit({ id, name, phone, active }: IEditPlayerDTO): Promise<void> {
    console.log("repo", { id, name, phone, active });
    await this.repository.update(id, {
      name,
      phone,
      active,
    });
  }
}

export default PlayersRepository;
