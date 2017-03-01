/**
 * Created by bangbang93 on 2017/3/1.
 */
'use strict';
const UserModel = require('../model/user');
const HashHelper = require('../helper/hash');

exports.login = async function (username, password) {
  let user = await UserModel.getByUsername(username);
  if (!user) throw new Error('no such user');

  let pwd = HashHelper.password(username, password);
  if (pwd != user.password) throw new Error('wrong password');

  delete user.password;
  return user;
};

