import { Player } from "../models/Player";
import { ICreatePlayerDTO, IPlayersRepository } from "./IPlayersRepository";

class PostgresPlayersRepository implements IPlayersRepository {
  create({ name, phone }: ICreatePlayerDTO) {
    console.log("1", name, phone);
    return null;
  }

  list(): Player[] {
    console.log("2");
    return null;
  }

  findByName(name: string): Player {
    console.log("3", name);
    return null;
  }
}

export { PostgresPlayersRepository };
