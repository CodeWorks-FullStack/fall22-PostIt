import { Schema } from "mongoose";
import { SCHEMA_OPTIONS, ObjectId } from "../db/DbUtils.js";

export const AlbumSchema = new Schema({

  name: { type: String, minlength: 1, maxlength: 15, required: true },
  coverImg: { type: String, minlength: 1, maxlength: 500, required: true },
  creatorId: { type: ObjectId, required: true, ref: 'Account' }
}, SCHEMA_OPTIONS)

AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
