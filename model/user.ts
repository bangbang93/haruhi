/**
 * Created by bangbang93 on 2017/3/1.
 */
import {Document, Model, Types} from 'mongoose'
import {mongoose} from '../model'

export interface IUserSchema {
  _id: Types.ObjectId
  username: string
  password: string
}

export interface IUserDocument extends Document, IUserSchema {
  _id: Types.ObjectId
}

export interface IUserModel extends Model<IUserDocument> {
  getByUsername(username: string): Promise<IUserDocument>
}

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
})

schema.statics.getByUsername = function (this: IUserModel, username: string) {
  return this.findOne({
    username,
  })
}

export const UserModel = mongoose.model<IUserDocument, IUserModel>('user', schema)
