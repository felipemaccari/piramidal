import TournamentsRepositoryInMemory from "@modules/tournaments/repositories/in-memory/TournamentsRepositoryInMemory";
import CreateTournamentUseCase from "@modules/tournaments/useCases/createTournament/CreateTournamentUseCase";

let createTournamentUseCase: CreateTournamentUseCase;
let tournamentsRepositoryInMemory: TournamentsRepositoryInMemory;

describe("Create a new tournamet", () => {
  beforeEach(() => {
    tournamentsRepositoryInMemory = new TournamentsRepositoryInMemory();
    createTournamentUseCase = new CreateTournamentUseCase(
      tournamentsRepositoryInMemory
    );
  });

  it("should be able to create a new tournament", async () => {
    const tournamentMock = {
      description: "Tournament Test",
      initialDate: "2006-12-15 14:26:05.502",
      finalDate: "2006-12-15 14:26:05.502",
    };

    await createTournamentUseCase.execute(tournamentMock);

    const tournaments = await tournamentsRepositoryInMemory.list();

    const tournamentCreated = tournaments.find(
      (tournament) => tournament.description === tournamentMock.description
    );

    expect(tournamentCreated).toHaveProperty("id");
  });
});
