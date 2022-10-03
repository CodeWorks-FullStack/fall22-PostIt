import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/DbUtils.js";


export const PictureSchema = new Schema({

  imgUrl: { type: String, required: true, minlength: 1, maxLength: 500 },
  albumId: { type: ObjectId, required: true, ref: 'Album' },
  creatorId: { type: ObjectId, required: true, ref: 'Account' }

}, SCHEMA_OPTIONS)


PictureSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
