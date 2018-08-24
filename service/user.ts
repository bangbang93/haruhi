/**
 * Created by bangbang93 on 2017/3/1.
 */
import * as HashHelper from '../helper/hash'
import {UserModel} from '../model/user'

export class UserService {
  public static async login(username: string, password: string) {
    const user = await UserModel.getByUsername(username)
    if (!user) throw new Error('no such user')

    const pwd = HashHelper.password(username, password)
    if (pwd !== user.password) throw new Error('wrong password')

    delete user.password
    return user
  }
}
