import { AuthRepository } from "../repositories/auth.repository";
import { ILoginParams, IRegisterParams } from "../types/auth.type";
import CustomError from "../utils/customError.util";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(params: IRegisterParams) {
    const { email, username, password } = params;
    const existingUser = await this.authRepository.findUserByEmail(
      params.email
    );
    if (existingUser) {
      throw new CustomError("User already exists", 400);
    }

    // Check if the username is already taken
    const existingUsername = await this.authRepository.findUserByUsername(
      username
    );
    if (existingUsername) {
      throw new CustomError("Username is already taken", 400);
    }

    const hashedPassword = await bcrypt.hash(password as string, 12);
    const newUser = await this.authRepository.createUser({
      email,
      username,
      hashedPassword,
    });

    return { message: "User created successfully", userId: newUser.id };
  }

  async login(params: ILoginParams) {
    const { email, password } = params;
    const user = await this.authRepository.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new CustomError("Invalid credentials", 401);
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );
    return token;
  }
}
