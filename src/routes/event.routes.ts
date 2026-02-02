import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { EventService } from "../services/event.service";
import { EventRepository } from "../repositories/event.repository";
import { authenticate } from "../middlewares/auth.middleware";
import { validateEventCreate, validateEventUpdate } from "../validators/event.validator";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

const repo = new EventRepository();
const service = new EventService(repo);
const controller = new EventController(service);

// Public routes
router.get("/", asyncHandler(controller.getAll));
router.get("/:id", asyncHandler(controller.getById));

// Protected routes (require authentication)
router.post("/", authenticate, validateEventCreate, asyncHandler(controller.create));
router.put("/:id", authenticate, validateEventUpdate, asyncHandler(controller.update));
router.delete("/:id", authenticate, asyncHandler(controller.delete));

export default router;
