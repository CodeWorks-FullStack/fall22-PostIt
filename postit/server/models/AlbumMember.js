import { Schema } from "mongoose";
import { ObjectId, SCHEMA_OPTIONS } from "../db/DbUtils.js";

export const AlbumMemberSchema = new Schema({

  albumId: { type: ObjectId, required: true, ref: 'Album' },
  accountId: { type: ObjectId, required: true, ref: 'Account' },

}, SCHEMA_OPTIONS)

AlbumMemberSchema.virtual('album', {
  localField: 'albumId',
  foreignField: '_id',
  justOne: true,
  ref: 'Album'
})

AlbumMemberSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

