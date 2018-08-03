/**
 * Created by bangbang93 on 16/9/20.
 */
'use strict'
const path                 = require('path')
const projectRoot          = path.resolve(__dirname, './src')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: IS_PRODUCTION ? false : '#eval-source-map',
  entry  : {
    index: path.resolve(__dirname, '../client/src/entries/index.ts'),
  },
  mode   : IS_PRODUCTION ? 'production' : 'development',
  output : {
    path      : path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename  : '[name].[hash].js',
  },
  resolve: {
    modules   : [
      path.join(__dirname, 'src'),
      path.join(__dirname, '../node_modules'),
    ],
    extensions: ['.js', '.vue', '.json', '.ts'],
  },
  module : {
    rules: [
      {
        test  : /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test   : /\.js$/,
        loader : 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/,
      },
      {
        test   : /\.ts$/,
        exclude: /node_modules/,
        use    : [{
          loader : 'ts-loader',
          options: {
            transpileOnly   : true,
            appendTsSuffixTo: [/\.vue$/],
            configFile      : 'tsconfig-fe.json',
          },
        }],
      },
      {
        test: /\.css$/,
        use : IS_PRODUCTION ?
          [MiniCssExtractPlugin.loader, 'css-loader'] :
          ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.s[ca]ss$/,
        use : IS_PRODUCTION ?
          [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] :
          ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test  : /\.html$/,
        loader: 'vue-html-loader',
      },
      {
        test  : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query : {
          limit: 10000,
          name : assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test  : /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query : {
          limit: 10000,
          name : assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
}

function assetsPath(p) {
  var assetsSubDirectory = 'static'
  return path.posix.join(assetsSubDirectory, p)
}
