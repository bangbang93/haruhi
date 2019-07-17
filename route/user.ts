'use strict'

import {Response} from 'express'
import Router from 'express-promise-router'
import {IServicedRequest} from '../module/middlewares'
import {UserService} from '../service/user'
const router = Router()

type Request = IServicedRequest<UserService>

router.get('/', async (req, res): Promise<void> => {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 2000)
  })
  res.json({message: 'await'})
})

router.get('/errors', async (req: Request, res: Response): Promise<void> => {
  const err = new Error('some error')
  err['foo'] = 'bar'
  throw err
})

module.exports = router
