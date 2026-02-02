import { EventModel, IEvent } from "../models/event.model";

export class EventRepository {
  create(data: Partial<IEvent>) {
    return EventModel.create(data);
  }

  findById(id: string) {
    return EventModel.findById(id);
  }

  findAll(filter: any, sort: any, skip: number, limit: number) {
    return EventModel.find(filter).sort(sort).skip(skip).limit(limit);
  }

  update(id: string, data: Partial<IEvent>) {
    return EventModel.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return EventModel.findByIdAndDelete(id);
  }
}
