import { Model } from "mongoose";
import eventModel from "../schema/event.schema";
import { Event } from "../types/event.types";

export class EventRepository {

    private eventModel: Model<Event>

    constructor() {
        this.eventModel = eventModel;
    }

    public async create(event: Event): Promise<Event> {
        return this.eventModel.create(event);
    }

    public async findAll(): Promise<Event[]> {
        return this.eventModel.find();
    }

    public async updateMany(events: Event[]): Promise<void> {
        for (const event of events) {
            await this.eventModel.updateOne({ id: event.id }, event);
        }
    }

}