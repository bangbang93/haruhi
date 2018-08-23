/**
 * Created by bangbang93 on 16/10/12.
 */
'use strict'
// tslint:disable:no-console

// https://github.com/shelljs/shelljs
const shell          = require('shelljs')
process.env.NODE_ENV = 'production'

const ora           = require('ora')
const webpack       = require('webpack')
const webpackConfig = require('../client/webpack.conf')

console.log(`
  Tip:
  Built files are meant to be served over an HTTP server.
  Opening index.html over file:// won\'t work.
`,
)

const spinner = ora('building for production...')
spinner.start()

webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors      : true,
    modules     : false,
    children    : false,
    chunks      : false,
    chunkModules: false,
  }))
  console.log()
})
