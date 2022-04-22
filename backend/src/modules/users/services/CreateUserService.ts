import {
  ICreateUserDTO,
  IUsersRepository,
} from "../repositories/IUsersRepository";

class CreateUserService {
  constructor(private userRepository: IUsersRepository) {}

  execute({ name, email, password }: ICreateUserDTO): void {
    const userAlreadyExists = this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("Email already exists");
    }

    this.userRepository.create({ name, email, password });
  }
}

export default CreateUserService;
