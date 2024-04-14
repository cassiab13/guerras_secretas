import { Schema, model } from 'mongoose'
import { ComicDate } from '../types/comic-date.types'

const comicDateSchema = new Schema({
    type: { type: String },
    date: { type: Date }
}, {
    timestamps: true
})

export default model<ComicDate>('ComicDate', comicDateSchema)