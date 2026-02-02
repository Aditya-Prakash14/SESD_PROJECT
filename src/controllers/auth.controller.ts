import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export class AuthController {
    constructor(private authService: AuthService) { }

    register = async (req: Request, res: Response) => {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            throw new ApiError(400, "Name, email, and password are required");
        }

        if (password.length < 6) {
            throw new ApiError(400, "Password must be at least 6 characters long");
        }

        const result = await this.authService.register(name, email, password);

        res.status(201).json(
            new ApiResponse(201, result, "User registered successfully")
        );
    };

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            throw new ApiError(400, "Email and password are required");
        }

        const result = await this.authService.login(email, password);

        res.status(200).json(
            new ApiResponse(200, result, "Login successful")
        );
    };
}
