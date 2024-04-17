import { Model } from "mongoose";
import storieModel from "../schema/storie.schema";
import { Storie } from "types/storie.types";

export class StorieRepository {

    private storieMode: Model<Storie>;

    constructor() {
        this.storieMode = storieModel;
    }

    public async create(storie: Storie): Promise<Storie> {
        return this.storieMode.create(storie);
    }

    public async findAll(): Promise<Storie[]> {
        return this.storieMode.find();
    } 

}