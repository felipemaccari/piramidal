import { container } from "tsyringe";

import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import ChallengesRepository from "@modules/challenges/infra/typeorm/repositories/ChallengesRepository";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import PlayersRepository from "@modules/players/infra/typeorm/repositories/PlayersRepository";
import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";
import TournamentsRepository from "@modules/tournaments/infra/typeorm/repositories/TournamentsRepository";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";

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
