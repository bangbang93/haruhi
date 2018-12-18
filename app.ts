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
      prefix: 'haruhi:session:',
      ...Config.database.redis,
    }),
    ...Config.session},
))

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(mongoSanitize)
app.use(haruhiMiddleware)

// tslint:disable-next-line:no-var-requires
app.use('/', require('./route/index'))

expressSimpleRoute(path.join(__dirname, 'route'), app)

if (app.get('env') === 'development') {
  app.use(history({
    verbose: true,
  }))
} else {
  app.use(history())
}

// tslint:disable:no-var-requires
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
// tslint:enable:no-var-requires

app.use(express.static(path.join(__dirname, 'public')))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404)
    .json({
      message: 'not found',
    })
})

// error handler
if (app.get('env') !== 'production') {
  app.use((err, req, res, next) => {
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
  app.use((err, req, res, next) => {
    if (!err.status) {
      req.logger.fatal({err})
      err.status = 500
    }
    if (res.headersSent) return
    res.status(err.status || 500)
      .json({
        message: err.message,
      })
  })
}

module.exports = app
