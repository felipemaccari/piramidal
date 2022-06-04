import { container } from "tsyringe";

import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import ChallengesRepository from "@modules/challenges/infra/typeorm/repositories/ChallengesRepository";
import ChallengesResultsRepository from "@modules/challenges/infra/typeorm/repositories/ChallengesResultsRepository";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { IChallengesResultsRepository } from "@modules/challenges/repositories/IChallengesResultsRepository";
import PlayersRepository from "@modules/players/infra/typeorm/repositories/PlayersRepository";
import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";
import TournamentsPlayersRepository from "@modules/tournaments/infra/typeorm/repositories/TournamentsPlayersRepository";
import TournamentsRepository from "@modules/tournaments/infra/typeorm/repositories/TournamentsRepository";
import ITournamentsPlayersRepository from "@modules/tournaments/repositories/ITournamentsPlayersRepository";
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

container.registerSingleton<IChallengesResultsRepository>(
  "ChallengesResultsRepository",
  ChallengesResultsRepository
);

container.registerSingleton<ITournamentsPlayersRepository>(
  "TournamentsPlayersRepository",
  TournamentsPlayersRepository
);
