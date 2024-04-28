import { Model } from "mongoose";
import { Populate } from "../types/populate.types";
import populateModel from "../schema/populate.schema";

export class PopulateRepository {

    private populateModel: Model<Populate>;

    constructor() {
        this.populateModel = populateModel;
    }

    public async create(populate: Populate): Promise<void> {
        this.populateModel.create(populate);
    }

    public async findByIdSerie(id: string): Promise<Populate | null> {
        return this.populateModel.findOne({ idSerie: id });
    }

}