import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description?: string;
  date: Date;
  location: string;
  category: string;
  organizer: string;
  capacity: number;
  price: number;
  isOnline: boolean;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    location: String,
    category: String,
    organizer: String,
    capacity: Number,
    price: Number,
    isOnline: Boolean
  },
  { timestamps: true }
);

export const EventModel = mongoose.model<IEvent>("Event", EventSchema);
