/**
 * Created by bangbang93 on 2017/3/1.
 */
'use strict';
const crypto = require('crypto');

exports.password = function (username, password) {
  const sha1 = crypto.createHash('sha1');
  sha1.update(username).update(password);
  return sha1.digest('hex');
};