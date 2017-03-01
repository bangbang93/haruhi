'use strict';
const express = require('express');
const router = express.Router();
const UserService = require('../service/user');

router.post('/login', function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  UserService.login(username, password)
    .then((user)=>{
      req.session.username = user.username;
      req.session.id = req.session.uid = user.id;
      req.status(200).json({
        message: 'login success'
      });
    })
    .catch(next);
});


module.exports = router;
