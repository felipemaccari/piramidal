import Player from "../../models/Player";
import PlayersRepository from "../../repositories/implementations/PlayersRepository";

class ListPlayersUseCase {
  constructor(private playersRepository: PlayersRepository) {}

  execute(): Player[] {
    return this.playersRepository.list();
  }
}

export default ListPlayersUseCase;
