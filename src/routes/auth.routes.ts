import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));

export default router;
