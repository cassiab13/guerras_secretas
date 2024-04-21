import { Model } from "mongoose";
import storieModel from "../schema/storie.schema";
import { Storie } from "types/storie.types";

export class StorieRepository {

    private storieModel: Model<Storie>;

    constructor() {
        this.storieModel = storieModel;
    }

    public async create(storie: Storie): Promise<Storie> {
        return this.storieModel.create(storie);
    }

    public async findAll(): Promise<Storie[]> {
        return this.storieModel.find();
    }

    public async updateMany(stories: Storie[]): Promise<void> {
        for (const storie of stories) {
            await this.storieModel.updateOne({ id: storie.id }, storie);
        }
    }

}