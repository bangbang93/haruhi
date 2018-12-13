/**
 * Created by bangbang93 on 2017/3/1.
 */
import * as bcrypt from 'bcrypt'
import {UserModel} from '../model/user'

export class UserService {
  public static async login(username: string, password: string) {
    const user = await UserModel.findOne({username})
      .select('+password')
    if (!user) throw new Error('no such user')

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) throw new Error('wrong password')

    return user
  }
}
