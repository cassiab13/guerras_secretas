import { Schema, model } from 'mongoose'
import { ComicText } from '../types/comit-text.types'

const comicTextSchema = new Schema({
    type: { type: String },
    language: { type: String },
    text: { type: String }
}, {
    timestamps: true
})

export default model<ComicText>('ComicText', comicTextSchema)