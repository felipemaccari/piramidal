import ICreatePlayerDTO from "@modules/players/dtos/ICreatePlayerDTO";
import Player from "@modules/players/infra/typeorm/entities/Player";

interface IPlayersRepository {
  create({ name, phone }: ICreatePlayerDTO): Promise<void>;
  list(): Promise<Player[]>;
  findByName(name: string): Promise<Player>;
  findByID(id: string): Promise<Player>;
}

export { IPlayersRepository };
