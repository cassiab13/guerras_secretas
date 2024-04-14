import { Schema, model } from 'mongoose'
import { Creator } from '../types/creator.types'

const creatorSchema = new Schema({
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    suffix:	{ type: String },
    fullName: { type: String },
    role: { type: String },
    modified: { type: Date },
    resourceURI: { type: String },
    thumbnail: { type: Schema.Types.ObjectId, ref: 'Image' },
    series: [{ type: Schema.Types.ObjectId, ref: 'Serie' }],
    stories: [{ type: Schema.Types.ObjectId, ref: 'Storie' }],
    comics: [{ type: Schema.Types.ObjectId, ref: 'Comic' }],
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
}, {
    timestamps: true
})

export default model<Creator>('Creator', creatorSchema)