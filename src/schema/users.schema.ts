import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    id: { type: Number },
    email: { type: String },
    username: { type: String },
    password: { type: String },
    isAdmin: { type: Boolean }
  },
  {
    timestamps: true,
  }
);

export default model<User>('User', userSchema)