/**
 * Created by bangbang93 on 2017/3/1.
 */
'use strict';
const CONFIG = {
  dev: {
    mysql: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'cp',
    },
    redis: '',
  }
};

const ENV = process.env.NODE_ENV || 'dev';

module.exports = CONFIG[ENV];