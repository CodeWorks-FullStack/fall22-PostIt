import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/DbUtils.js";

export const AlbumMemberSchema = new Schema({

  albumId: { type: ObjectId, required: true, ref: 'Album' },
  accountId: { type: ObjectId, required: true, ref: 'Account' },

}, SCHEMA_OPTIONS)


// creates a unique constraint across multiple fields
AlbumMemberSchema.index({ accountId: 1, albumId: 1 }, { unique: true })

AlbumMemberSchema.virtual('album', {
  localField: 'albumId',
  foreignField: '_id',
  justOne: true,
  ref: 'Album'
})

AlbumMemberSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
