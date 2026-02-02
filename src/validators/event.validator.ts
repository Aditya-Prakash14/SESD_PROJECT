import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const validateEventCreate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, date, location, category } = req.body;

    if (!title || !title.trim()) {
        throw new ApiError(400, "Event title is required");
    }

    if (!date) {
        throw new ApiError(400, "Event date is required");
    }

    if (!location || !location.trim()) {
        throw new ApiError(400, "Event location is required");
    }

    if (!category || !category.trim()) {
        throw new ApiError(400, "Event category is required");
    }

    // Validate date format
    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
        throw new ApiError(400, "Invalid date format");
    }

    // Check if date is in the future
    if (eventDate < new Date()) {
        throw new ApiError(400, "Event date must be in the future");
    }

    next();
};

export const validateEventUpdate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, date } = req.body;

    if (title !== undefined && !title.trim()) {
        throw new ApiError(400, "Event title cannot be empty");
    }

    if (date) {
        const eventDate = new Date(date);
        if (isNaN(eventDate.getTime())) {
            throw new ApiError(400, "Invalid date format");
        }
    }

    next();
};
