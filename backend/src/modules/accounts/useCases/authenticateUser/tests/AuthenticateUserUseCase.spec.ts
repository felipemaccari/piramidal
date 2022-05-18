import AppError from "../../../../../errors/AppError";
import ICreateUserDTO from "../../../dtos/ICreateUserDTO";
import UsersRepositoryInMemory from "../../../repositories/in-memory/UsersRepositoryInMemory";
import CreateUserUseCase from "../../createUser/CreateUserUseCase";
import AuthenticateUserUseCase from "../AuthenticateUserUseCase";

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
