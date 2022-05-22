import ICreatePlayerDTO from "@modules/players/dtos/ICreatePlayerDTO";
import Player from "@modules/players/infra/typeorm/entities/Player";
import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";

class PlayersRepositoryInMemory implements IPlayersRepository {
  players: Player[] = [];

  async create({ name, phone }: ICreatePlayerDTO): Promise<void> {
    const player = new Player();

    Object.assign(player, { name, phone });

    this.players.push(player);
  }

  async list(): Promise<Player[]> {
    return this.players;
  }

  async findByName(name: string): Promise<Player> {
    const player = this.players.find((player) => player.name === name);

    return player;
  }
}

export default PlayersRepositoryInMemory;
