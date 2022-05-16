import User from "../entities/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface IUsersRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<void>;
  list(): Promise<User[]>;
  findByEmail(email): Promise<User>;
  findById(id): Promise<User>;
}

export { IUsersRepository, ICreateUserDTO };
