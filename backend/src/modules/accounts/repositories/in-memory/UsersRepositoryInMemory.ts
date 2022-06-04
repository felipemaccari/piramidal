import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import User from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { name, email, password });

    this.users.push(user);
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findByID(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }
}

export default UsersRepositoryInMemory;
