import { inject, injectable } from "tsyringe";

import Player from "../../infra/typeorm/entities/Player";
import PlayersRepository from "../../repositories/implementations/PlayersRepository";

@injectable()
class ListPlayersUseCase {
  constructor(
    @inject("PlayersRepository") private playersRepository: PlayersRepository
  ) {}

  async execute(): Promise<Player[]> {
    return await this.playersRepository.list();
  }
}

export default ListPlayersUseCase;
