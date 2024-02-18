import { UserRepository } from "../repositories/user.repository";
import { IUpdateUserParams } from "../types/user.type";
import CustomError from "../utils/customError.util";

export class UserService {
  private userRepository = new UserRepository();

  async getUserById(userId: string) {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new CustomError("User Not Found", 404);
    }

    return user;
  }

  async updateUser(params: IUpdateUserParams) {
    const updatedUser = await this.userRepository.updateUser(params);

    return updatedUser;
  }
}
