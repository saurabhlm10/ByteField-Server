// src/controllers/authController.ts
import { Request } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export const register = async (req: Request) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  // Attempt to register the user with the provided credentials
  const result = await authService.register({ username, email, password });

  // If registration is successful, return the appropriate result and HTTP status
  return { result: result, status: 201 };
};

export const login = async (req: Request) => {
  const { email, password } = req.body;

  // Attempt to log in the user with the provided credentials
  const token = await authService.login({ email, password });

  // If login is successful, return the token and HTTP status
  return { result: { token }, status: 200 };
};
