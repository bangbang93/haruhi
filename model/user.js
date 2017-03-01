/**
 * Created by bangbang93 on 2017/3/1.
 */
'use strict';
const knex = require('../model').knex;

const TABLE = 'user';

exports.getById = function (id) {
  return knex(TABLE).first({
    id
  })
};

exports.getByUsername = function (username) {
  return knex(TABLE).first({
    username
  })
};