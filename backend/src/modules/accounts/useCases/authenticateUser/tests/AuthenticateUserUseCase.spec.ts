import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import UsersRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import AuthenticateUserUseCase from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import CreateUserUseCase from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import AppError from "@shared/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it("should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
      name: "New user",
      email: "user@test.com",
      password: "1234",
    };

    await createUserUseCase.execute(user);

    const userToken = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(userToken).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "error@email.com",
        password: "000",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "New user",
        email: "user@test.com",
        password: "1234",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "user@test.com",
        password: "0000",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
