import { Model } from "mongoose";
import { Image } from "../types/image.types";
import imageModel from "../schema/image.schema";

export class ImageRepository {

    private imageModel: Model<Image>

    constructor() {
        this.imageModel = imageModel;
    }

    public async create(image: Image) {
        return this.imageModel.create(image);
    }

}