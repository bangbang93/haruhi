'use strict'

import {Request, Response} from 'express'
import Router from 'express-promise-router'
const router = Router()

router.get('/', async (req, res) => {
  await new Promise( (resolve, reject) => {
    setTimeout(resolve, 2000)
  })
  res.json({message: 'await'})
})

router.get('/errors', async (req: Request, res: Response) => {
  throw new Error('some error')
})

module.exports = router
