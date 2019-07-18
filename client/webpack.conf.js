/**
 * Created by bangbang93 on 16/9/30.
 */
'use strict'
/* eslint-disable @typescript-eslint/no-var-requires, no-console, @typescript-eslint/no-require-imports */
const config               = require('./webpack')
const webpack              = require('webpack')
const merge                = require('webpack-merge')
const HtmlWebpackPlugin    = require('html-webpack-plugin')
const CleanPlugin          = require('clean-webpack-plugin')
const {VueLoaderPlugin}    = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

let plugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `'${process.env.NODE_ENV}'`,
    },
  }),
]
if (IS_PRODUCTION) {
  console.log('production webpack')
  plugins     = [
    ...plugins,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new CleanPlugin(config.output.path, {
      exclude: ['.gitkeep'],
      root   : require('path')
        .resolve('..'),
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename     : '[name].[hash].css',
    }),
  ]
  const entries = Object.keys(config.entry)
  entries.forEach((entry) => {
    plugins.push(new HtmlWebpackPlugin({
      chunks  : [entry, 'vendor.js'],
      filename: `${entry}.html`,
      inject  : true,
      template: `client/src/html/${entry}.html`,
    }))
  })
} else {
  // add hot-reload related code to entry chunks
  Object.keys(config.entry)
    .forEach((name) => {
      config.entry[name] = ['./client/dev-client'].concat(config.entry[name])
    })
  plugins     = [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
  ]
  const entries = Object.keys(config.entry)
  entries.forEach((entry) => {
    plugins.push(new HtmlWebpackPlugin({
      chunks  : [entry],
      filename: `${entry}.html`,
      inject  : true,
      template: `client/src/html/${entry}.html`,
    }))
  })
}

module.exports = merge(config, {
  plugins,
})
