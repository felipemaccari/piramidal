import { Player } from "../models/Player";

interface ICreatePlayerDTO {
  name: string;
  phone: string;
}

class PlayersRepository {
  private players: Player[];

  constructor() {
    this.players = [];
  }

  create({ name, phone }: ICreatePlayerDTO): void {
    const player = new Player();

    Object.assign(player, { name, phone, created_at: new Date() });

    this.players.push(player);
  }

  list(): Player[] {
    return this.players;
  }

  findByName(name: string): Player {
    const player = this.players.find((player) => player.name === name);

    return player;
  }
}

export { PlayersRepository };
