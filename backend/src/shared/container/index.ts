import { container } from "tsyringe";

import UsersRepository from "../../modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { IChallengesRepository } from "../../modules/challenges/repositories/IChallengesRepository";
import ChallengesRepository from "../../modules/challenges/repositories/implementations/ChallengesRepository";
import PlayersRepository from "../../modules/players/repositories/implementations/PlayersRepository";
import { IPlayersRepository } from "../../modules/players/repositories/IPlayersRepository";
import TournamentsRepository from "../../modules/tournaments/repositories/implementations/TournamentsRepository";
import ITournamentsRepository from "../../modules/tournaments/repositories/ITournamentsRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IPlayersRepository>(
  "PlayersRepository",
  PlayersRepository
);

container.registerSingleton<IChallengesRepository>(
  "ChallengesRepository",
  ChallengesRepository
);

container.registerSingleton<ITournamentsRepository>(
  "TournamentsRepository",
  TournamentsRepository
);
