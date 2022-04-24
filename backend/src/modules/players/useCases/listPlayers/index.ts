import PlayersRepository from "../../repositories/implementations/PlayersRepository";
import ListPlayersController from "./ListPlayersController";
import ListPlayersUseCase from "./ListPlayersUseCase";

const playersRepository = PlayersRepository.getInstance();

const listPlayersUseCase = new ListPlayersUseCase(playersRepository);
const listPlayersController = new ListPlayersController(listPlayersUseCase);

export default listPlayersController;
