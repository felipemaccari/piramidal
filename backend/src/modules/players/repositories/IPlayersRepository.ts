import ICreatePlayerDTO from "@modules/players/dtos/ICreatePlayerDTO";
import Player from "@modules/players/infra/typeorm/entities/Player";

import IEditPlayerDTO from "../dtos/IEditPlayerDTO";

interface IPlayersRepository {
  create({ name, phone }: ICreatePlayerDTO): Promise<void>;
  list(): Promise<Player[]>;
  findByName(name: string): Promise<Player>;
  findByID(id: string): Promise<Player>;
  edit(data: IEditPlayerDTO): Promise<void>;
}

export { IPlayersRepository };
