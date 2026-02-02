import { EventRepository } from "../repositories/event.repository";
import { ApiError } from "../utils/ApiError";

export class EventService {
  constructor(private eventRepo: EventRepository) {}

  async createEvent(data: any) {
    return this.eventRepo.create(data);
  }

  async getEventById(id: string) {
    const event = await this.eventRepo.findById(id);
    if (!event) throw new ApiError(404, "Event not found");
    return event;
  }

  async getAllEvents(query: any) {
    const {
      search,
      category,
      sort = "date",
      order = "asc",
      page = 1,
      limit = 10
    } = query;

    const filter: any = {};
    if (search) filter.title = { $regex: search, $options: "i" };
    if (category) filter.category = category;

    const skip = (page - 1) * limit;
    const sortQuery = { [sort]: order === "asc" ? 1 : -1 };

    return this.eventRepo.findAll(filter, sortQuery, skip, limit);
  }

  updateEvent(id: string, data: any) {
    return this.eventRepo.update(id, data);
  }

  deleteEvent(id: string) {
    return this.eventRepo.delete(id);
  }
}
