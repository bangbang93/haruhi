'use strict'
import * as bodyParser from 'body-parser'
import * as history from 'connect-history-api-fallback'
import * as connectRedis from 'connect-redis'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as mongoSanitize from 'express-mongo-sanitize'
import * as session from 'express-session'
import * as expressSimpleRoute from 'express-simple-route'
import * as logger from 'morgan'
import * as path from 'path'
import * as Config from './config'
import {redis} from './model'
import {haruhiMiddleware} from './module/middlewares'

const app = express()
app.set('trust proxy', ['loopback', 'uniquelocal'])

if (app.get('env') === 'development') {
  app.use(logger('dev'))
} else {
  app.use(logger('combined'))
}
const RedisStore = connectRedis(session)

app.use(cookieParser())
app.use(session({
  store: new RedisStore({
    client: redis as any,
    prefix: 'haruhi:session:',
  }),
  ...Config.session,
}))

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(mongoSanitize)
app.use(haruhiMiddleware)

/* eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
app.use('/', require('./route/index'))

expressSimpleRoute(path.join(__dirname, 'route'), app)

if (app.get('env') === 'development') {
  app.use(history({
    verbose: true,
  }))
} else {
  app.use(history())
}

/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
if (app.get('env') === 'development') {
  const webpack       = require('webpack')
  const webpackConfig = require('./client/webpack.conf')
  const compiler      = webpack(webpackConfig)
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats     : {
      chunks: false,
      colors: true,
    },
  })
  const hotMiddleware = require('webpack-hot-middleware')(compiler)
  app.use(devMiddleware)
  app.use(hotMiddleware)
}
/* eslint-enable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */

app.use(express.static(path.join(__dirname, 'public')))

// catch 404 and forward to error handler
/* eslint-disable @typescript-eslint/no-unused-vars */
app.use((req, res, next): void => {
  res.status(404)
    .json({
      message: 'not found',
    })
})

// error handler
if (app.get('env') !== 'production') {
  app.use((err, req, res, next): void => {
    if (!err.status) {
      req.logger.fatal({err})
      err.status = 500
    }
    if (res.headersSent) return
    res.status(err.status)
      .json({
        err,
        message: err.message,
      })
  })
} else {
  app.use((err, req, res, next): void => {
    if (!err.status) {
      req.logger.fatal({err})
      err.status = 500
    }
    if (res.headersSent) return
    res.status(err.status)
      .json({
        message: err.message,
      })
  })
}

module.exports = app
