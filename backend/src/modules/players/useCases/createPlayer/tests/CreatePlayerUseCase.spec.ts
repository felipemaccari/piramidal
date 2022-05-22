import PlayersRepositoryInMemory from "@modules/players/repositories/in-memory/PlayersRepositoryInMemory";
import CreatePlayerUseCase from "@modules/players/useCases/createPlayer/CreatePlayerUseCase";
import AppError from "@shared/errors/AppError";

let createPlayerUseCase: CreatePlayerUseCase;
let playersRepositoryInMemory: PlayersRepositoryInMemory;

describe("Create a new player", () => {
  beforeEach(() => {
    playersRepositoryInMemory = new PlayersRepositoryInMemory();
    createPlayerUseCase = new CreatePlayerUseCase(playersRepositoryInMemory);
  });

  it("should be able to create a new player", async () => {
    const playerMock = {
      name: "Player test",
      phone: "46000919273",
    };

    await createPlayerUseCase.execute(playerMock);

    const playerCreated = await playersRepositoryInMemory.findByName(
      playerMock.name
    );

    expect(playerCreated).toHaveProperty("id");
  });

  it("should be not able to create a duplicated name player", () => {
    expect(async () => {
      const playerMock = {
        name: "Player test",
        phone: "46000919273",
      };

      await createPlayerUseCase.execute(playerMock);

      await createPlayerUseCase.execute(playerMock);
    }).rejects.toBeInstanceOf(AppError);
  });
});
