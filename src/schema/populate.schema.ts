import { model, Schema } from "mongoose";
import { Populate } from "../types/populate.types";

const populateSchema = new Schema(
    {
        idSerie: { type: Number },
        comics: Boolean,
        characters: Boolean,
        creators: Boolean,
        stories: Boolean,
        events: Boolean
    },
    {
      timestamps: true,
    }
);
  
export default model<Populate>('Populate', populateSchema)