import { PrismaClient } from "@prisma/client";
import { IRegisterParams } from "../types/auth.type";

const prisma = new PrismaClient();
export class AuthRepository {
  async createUser(params: IRegisterParams) {
    const { email, username, hashedPassword } = params;
    return await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword as string,
      },
    });
  }

  async findUserByEmail(email: string) {
    console.log("email", email);
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async findUserByUsername(username: string) {
    return await prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
