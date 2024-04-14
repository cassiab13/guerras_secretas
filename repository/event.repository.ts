import { Model } from "mongoose";
import eventModel from "../schema/event.schema";
import { Event } from "../types/event.types";

export class EventRepository {

    private eventModel: Model<Event>

    constructor() {
        this.eventModel = eventModel;
    }

    public async create(event: Event) {
        return this.eventModel.create(event);
    }

}