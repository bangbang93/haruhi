/**
 * Created by bangbang93 on 2017/4/28.
 */
'use strict'
const BunyanPrettyStream = require('bunyan-prettystream')

const prettyStream = new BunyanPrettyStream()
prettyStream.pipe(process.stdout)

module.exports = {
  middleware: {
    name: 'haruhi',
    level: 'info',
    streams: [{
      type: 'raw',
      stream: prettyStream,
    }, {
      level: 'fatal',
      stream: process.stderr,
    }],
  },
}
