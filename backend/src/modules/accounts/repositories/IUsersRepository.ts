import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../entities/User";

interface IUsersRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<void>;
  list(): Promise<User[]>;
  findByEmail(email): Promise<User>;
  findById(id): Promise<User>;
}

export { IUsersRepository };
