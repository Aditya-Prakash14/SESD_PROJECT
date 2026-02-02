import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { ApiError } from "../utils/ApiError";

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                role?: string;
            };
        }
    }
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "No token provided");
        }

        const token = authHeader.split(" ")[1];

        // Verify token
        const userRepo = new UserRepository();
        const authService = new AuthService(userRepo);
        const { userId } = authService.verifyToken(token);

        // Get user details
        const user = await userRepo.findById(userId);

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        // Attach user to request
        req.user = {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role
        };

        next();
    } catch (error) {
        next(error);
    }
};
