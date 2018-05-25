/**
 * Created by bangbang93 on 16/9/30.
 */
'use strict';

const config = require('./webpack');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const IS_PRODUCTION = process.env.NODE_ENV === 'production'


let plugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `'${process.env.NODE_ENV}'`
    }
  }),
];
if (IS_PRODUCTION) {
  console.log('production webpack')
  plugins = [
    ...plugins,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new CleanPlugin(config.output.path, {
      root   : require('path').resolve('..'),
      exclude: ['.gitkeep']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css',
    })
  ]
  let entries = Object.keys(config.entry)
  entries.forEach((entry) => {
    plugins.push(new HtmlWebpackPlugin({
      filename: `${entry}.html`,
      template: `client/src/html/${entry}.html`,
      inject  : true,
      chunks  : [entry, 'vendor.js']
    }))
  })
} else {

// add hot-reload related code to entry chunks
  Object.keys(config.entry).forEach(function (name) {
    config.entry[name] = ['./client/dev-client'].concat(config.entry[name])
  })
  plugins     = [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
  ]
  let entries = Object.keys(config.entry)
  entries.forEach((entry) => {
    plugins.push(new HtmlWebpackPlugin({
      filename: `${entry}.html`,
      template: `client/src/html/${entry}.html`,
      inject  : true,
      chunks  : [entry]
    }))
  })
}

module.exports = merge(config, {
  plugins
});
