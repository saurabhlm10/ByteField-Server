import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export const getUserProfile = async (req: Request, res: Response) => {
  const { userId } = req.user!;

  const userProfile = await userService.getUserById(userId);

  return { result: userProfile, status: 200 };
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const { userId } = req.user!;

  const updateData = req.body;

  const updatedUser = await userService.updateUser({ userId, updateData });

  return { result: updatedUser, status: 200 };
};
