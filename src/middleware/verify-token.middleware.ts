import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomError from "../utils/customError.util";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = req.cookies?.token || (authHeader && authHeader.split(" ")[1]);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    // Check if the decoded payload is an object and has a userId property
    if (typeof decoded === "object" && "userId" in decoded) {
      // Assert the decoded object to have the structure { userId: string }
      req.user = { userId: decoded.userId as string };
      next();
    } else {
      return res.status(401).json({ message: "Invalid token." });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};
