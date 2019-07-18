/**
 * Created by bangbang93 on 2017/3/20.
 */
'use strict'
/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
const configure = {
  database: require('./default/database'),
  session : require('./default/session'),
  logger  : require('./default/logger'),
}

const index = Object.keys(configure)

const env = process.env.NODE_ENV || 'development'

index.forEach((config) => {
  try {
    require.resolve(`./${env}/${config}`)
    configure[config] = require(`./${env}/${config}`)
    /* eslint-disable-next-line no-empty */// tslint:disable-next-line
  } catch {}
})

module.exports = configure
