import { Player } from "../models/Player";

interface ICreatePlayerDTO {
  name: string;
  phone: string;
}

interface IPlayersRepository {
  create({ name, phone }: ICreatePlayerDTO);
  list(): Player[];
  findByName(name: string): Player;
}

export { IPlayersRepository, ICreatePlayerDTO };
