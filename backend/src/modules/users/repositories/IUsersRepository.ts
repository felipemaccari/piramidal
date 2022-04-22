import User from "../models/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface IUsersRepository {
  create({ name, email, password }: ICreateUserDTO);
  list(): User[];
  findByEmail(email): User;
}

export { IUsersRepository, ICreateUserDTO };
