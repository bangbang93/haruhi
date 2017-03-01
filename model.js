/**
 * Created by bangbang93 on 2017/3/1.
 */
'use strict';
const Config = require('./config/db');
const Redis = require('redis');
const knex = require('knex')({
  client: 'mysql',
  connection: Config.mysql
});

const redis = require('co-redis')(Redis.createClient(Config.redis));


module.exports = {
  knex,
  redis,
};

