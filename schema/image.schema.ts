import { Schema, model } from 'mongoose'
import { Image } from '../types/image.types'

const imageSchema = new Schema({
    path: { type: String, required: true },
    extension: { type: String, required: true }
}, {
    timestamps: true
})

export default model<Image>('Image', imageSchema)