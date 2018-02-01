'use strict';
import Router from 'express-promise-router'
const router = Router();

router.get('/', async function(req, res) {
  await new Promise(function (resolve, reject) {
    setTimeout(()=>resolve(), 2000);
  });
  res.json({message: 'await'});
});

router.get('/error', async function (req, res) {
  let err = new Error('some thing happened');
  err['req'] = req.url;
  throw err;
});


module.exports = router;
