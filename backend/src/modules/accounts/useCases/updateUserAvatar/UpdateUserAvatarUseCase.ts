import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  id: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({ id, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}

export default UpdateUserAvatarUseCase;
