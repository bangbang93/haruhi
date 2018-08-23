/**
 * Created by bangbang93 on 14-10-24.
 */
import * as Redis from 'ioredis'
import * as Mongoose from 'mongoose'
import {database as Config} from './config'

Mongoose.connect(`mongodb://${Config.mongodb.host}/${Config.mongodb.database}`)

export const redis = new Redis(Config.redis)

export const mongoose = Mongoose
