'use strict'
const express      = require('express')
const path         = require('path')
const favicon      = require('serve-favicon')
const logger       = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser   = require('body-parser')
const { haruhiMiddleware } = require('./module/middlewares')
const history      = require('connect-history-api-fallback')

const app = express()
app.set('trust proxy', ['loopback', 'uniquelocal'])

if (app.get('env') === 'development') {
  app.use(logger('dev'))
} else {
  app.use(logger('combined'))
}

const session    = require('express-session')
const RedisStore = require('connect-redis')(session)

app.use(cookieParser())
app.use(session(Object.assign({
    store: new RedisStore({
      prefix: 'haruhi:session:',
      ...require('./config').database.redis,
    }),
  }, require('./config').session),
))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(haruhiMiddleware)

app.use('/', require('./route/index'))

require('express-simple-route')(path.join(__dirname, 'route'), app)

if (app.get('env') === 'development') {
  app.use(history({
    verbose: true,
  }))
} else {
  app.use(history())
}

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

app.use(express.static(path.join(__dirname, 'public')))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404)
    .json({
      message: 'not found',
    })
})

// error handler
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    console.error(err)
    if (res.headersSent) return
    res.status(err.status || 500)
      .json({
        err,
        message: err.message,
      })
  })
} else {
  app.use((err, req, res, next) => {
    console.error(err)
    if (res.headersSent) return
    res.status(err.status || 500)
      .json({
        message: err.message,
      })
  })
}

module.exports = app
