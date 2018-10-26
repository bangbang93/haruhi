/**
 * Created by bangbang93 on 2017/4/28.
 */
'use strict'
const BunyanPrettyStream = require('bunyan-prettystream')

const prettyStream = new BunyanPrettyStream()
prettyStream.pipe(process.stdout)

const streams = [{
  type: 'raw',
  stream: prettyStream,
}, {
  level: 'fatal',
  stream: process.stderr,
}]

module.exports = function getLogger(name) {
  const defaultLogger = {
    name,
    level: 'debug',
    streams,
  }

  let loggers = {
    middleware: {
      name: 'haruhi',
      level: 'info',
      streams,
    },
  }
  const steps = name.split('.')
  for (const step of steps) {
    if (step in loggers) {
      loggers = loggers[step]
    } else {
      return defaultLogger
    }
  }
  return loggers
}
