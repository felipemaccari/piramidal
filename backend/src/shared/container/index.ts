import { container } from "tsyringe";

import PlayersRepository from "../../modules/players/repositories/implementations/PlayersRepository";
import { IPlayersRepository } from "../../modules/players/repositories/IPlayersRepository";
import UsersRepository from "../../modules/users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IPlayersRepository>(
  "PlayersRepository",
  PlayersRepository
);
