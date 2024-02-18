import { PrismaClient } from "@prisma/client";
import { IUpdateUserParams } from "../types/user.type";

const prisma = new PrismaClient();

export class UserRepository {
  async findUserById(userId: string) {
    return await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  async updateUser(params: IUpdateUserParams) {
    const { userId, updateData } = params;

    return await prisma.user.update({
      where: { id: parseInt(userId) },
      data: updateData,
    });
  }
}
