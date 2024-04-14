import { Schema, model } from 'mongoose'
import { Event } from '../types/event.types'

const eventSchema = new Schema({
    title:  { type: String },
    description:  { type: String },
    resourceURI:  { type: String },
    modified: { type: Date },
    start:  { type: Date },
    end:  { type: Date },
    thumbnail: { type: Schema.Types.ObjectId, ref: 'Image' },
    comics: [{ type: Schema.Types.ObjectId, ref: 'Comic' }],
    stories: [{ type: Schema.Types.ObjectId, ref: 'Storie' }],
    series: [{ type: Schema.Types.ObjectId, ref: 'Serie' }],
    characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
    creators: [{ type: Schema.Types.ObjectId, ref: 'Creator' }],
    next: { type: Schema.Types.ObjectId, ref: 'Event' },
    previous: { type: Schema.Types.ObjectId, ref: 'Event' }
}, {
    timestamps: true
})

export default model<Event>('Event', eventSchema)