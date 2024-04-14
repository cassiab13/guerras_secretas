import { Schema, model } from 'mongoose'
import { Serie } from '../types/serie.types'

const serieSchema = new Schema({
    title: { type: String },
    description: { type: String },
    resourceURI: { type: String },
    type: { type: String },
    modified: { type: Date },
    thumbnail: { type: Schema.Types.ObjectId, ref: 'Image' },
    comics: [{ type: Schema.Types.ObjectId, ref: 'Comic' }],
    series: [{ type: Schema.Types.ObjectId, ref: 'Serie' }],
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
    creators: [{ type: Schema.Types.ObjectId, ref: 'Creator' }] 
}, {
    timestamps: true
})

export default model<Serie>('Serie', serieSchema)