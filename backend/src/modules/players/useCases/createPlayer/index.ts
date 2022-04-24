import PlayersRepository from "../../repositories/implementations/PlayersRepository";
import CreatePlayerController from "./CreatePlayerController";
import CreatePlayerUseCase from "./CreatePlayerUseCase";

const playersRepository = PlayersRepository.getInstance();

const createPlayerUseCase = new CreatePlayerUseCase(playersRepository);
const createPlayerController = new CreatePlayerController(createPlayerUseCase);

export default createPlayerController;
