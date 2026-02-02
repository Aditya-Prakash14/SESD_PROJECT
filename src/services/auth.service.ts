import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import { ApiError } from "../utils/ApiError";

export class AuthService {
    constructor(private userRepo: UserRepository) { }

    async register(name: string, email: string, password: string) {
        // Check if user already exists
        const existingUser = await this.userRepo.findByEmail(email);
        if (existingUser) {
            throw new ApiError(400, "User already exists with this email");
        }

        // Create new user
        const user = await this.userRepo.create({ name, email, password });

        // Generate token
        const token = this.generateToken(user._id.toString());

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        };
    }

    async login(email: string, password: string) {
        // Find user by email
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new ApiError(401, "Invalid credentials");
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid credentials");
        }

        // Generate token
        const token = this.generateToken(user._id.toString());

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        };
    }

    private generateToken(userId: string): string {
        const secret = process.env.JWT_SECRET || "your-secret-key-change-in-production";
        return jwt.sign({ userId }, secret, { expiresIn: "7d" });
    }

    verifyToken(token: string): { userId: string } {
        try {
            const secret = process.env.JWT_SECRET || "your-secret-key-change-in-production";
            return jwt.verify(token, secret) as { userId: string };
        } catch (error) {
            throw new ApiError(401, "Invalid or expired token");
        }
    }
}
