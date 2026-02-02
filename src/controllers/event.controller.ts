import { Request, Response } from "express";
import { EventService } from "../services/event.service";

export class EventController {
  constructor(private eventService: EventService) {}

  create = async (req: Request, res: Response) => {
    const event = await this.eventService.createEvent(req.body);
    res.status(201).json(event);
  };

  getById = async (req: Request, res: Response) => {
    const event = await this.eventService.getEventById(req.params.id);
    res.json(event);
  };

  getAll = async (req: Request, res: Response) => {
    const events = await this.eventService.getAllEvents(req.query);
    res.json(events);
  };

  update = async (req: Request, res: Response) => {
    const event = await this.eventService.updateEvent(req.params.id, req.body);
    res.json(event);
  };

  delete = async (req: Request, res: Response) => {
    await this.eventService.deleteEvent(req.params.id);
    res.status(204).send();
  };
}
