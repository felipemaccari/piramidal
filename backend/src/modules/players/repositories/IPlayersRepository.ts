import Player from "../entities/Player";

interface ICreatePlayerDTO {
  name: string;
  phone: string;
}

interface IPlayersRepository {
  create({ name, phone }: ICreatePlayerDTO): Promise<void>;
  list(): Promise<Player[]>;
  findByName(name: string): Promise<Player>;
}

export { IPlayersRepository, ICreatePlayerDTO };
