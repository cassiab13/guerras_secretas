import { Schema, model } from 'mongoose'
import { SerieSummary } from "../types/serie-summary.types";

const serieSummarySchema = new Schema({
    serie: { type: Schema.Types.ObjectId, ref: 'Serie' },
    name: { type: String }
}, {
    timestamps: true
})

export default model<SerieSummary>('SerieSummary', serieSummarySchema)