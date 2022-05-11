import Player from "../../entities/Player";
import { IPlayersRepository, ICreatePlayerDTO } from "../IPlayersRepository";

class PlayersRepository implements IPlayersRepository {
  private players: Player[];

  private static INSTANCE: PlayersRepository;

  private constructor() {
    this.players = [];
  }

  public static getInstance(): PlayersRepository {
    if (!PlayersRepository.INSTANCE) {
      PlayersRepository.INSTANCE = new PlayersRepository();
    }

    return PlayersRepository.INSTANCE;
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

export default PlayersRepository;
