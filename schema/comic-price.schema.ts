import { Schema, model } from 'mongoose'
import { ComicPrice } from '../types/comic-price.types'

const comicPriceSchema = new Schema({
    type: { type: String },
    price: { type: Number }
}, {
    timestamps: true
})

export default model<ComicPrice>('ComicPrice', comicPriceSchema)