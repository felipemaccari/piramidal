import { PlayersRepository } from "../repositories/PlayersRepository";

interface IRequest {
  name: string;
  phone: string;
}

class CreatePlayerService {
  constructor(private playersRepository: PlayersRepository) {}

  execute({ name, phone }: IRequest): void {
    const playerAlreadyExists = this.playersRepository.findByName(name);

    if (playerAlreadyExists) {
      throw new Error("Player already exists");
    }

    this.playersRepository.create({ name, phone });
  }
}

export { CreatePlayerService };
