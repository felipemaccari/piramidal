import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../entities/User";

interface IUsersRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<void>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
