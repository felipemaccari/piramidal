import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import User from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    id,
    name,
    email,
    password,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = await this.repository.create({
      id,
      name,
      email,
      password,
      avatar,
    });

    await this.repository.save(user);
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    return user;
  }
}

export default UsersRepository;
