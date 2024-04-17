import { Schema, model } from 'mongoose'
import { Comic } from '../types/comic.types'

const comicSchema = new Schema({
    id: { type: Number },
    digitalId: { type: Number },
    title: { type: String },
    issueNumber: { type: Number },
    variantDescription: { type: String },
    description: { type: String },
    modified: Date,
    isbn: { type: String },
    upc: { type: String },
    diamondCode: { type: String },
    ean: { type: String },
    issn: { type: String },
    format: { type: String },
    pageCount: { type: Number },
    resourceURI: { type: String },
    textObjects: [{ type: Schema.Types.ObjectId, ref: "ComicText" }],
    serie: { type: Schema.Types.ObjectId, ref: "Serie" },
    dates: [{ type: Schema.Types.ObjectId, ref: "ComicDate" }],
    prices: [{ type: Schema.Types.ObjectId, ref: "ComicPrice" }],
    thumbnail: { type: Schema.Types.ObjectId, ref: "Image" },
    images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
    creators: [{ type: Schema.Types.ObjectId, ref: "Creator" }],
    characters: [{ type: Schema.Types.ObjectId, ref: "Character" }],
    stories: [{ type: Schema.Types.ObjectId, ref: "Storie" }],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  },
  {
    timestamps: true,
  }
);

export default model<Comic>('Comic', comicSchema)