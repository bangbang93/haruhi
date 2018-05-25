/**
 * Created by bangbang93 on 16/9/20.
 */
'use strict';
const path = require('path');
const projectRoot = path.resolve(__dirname, './src');

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

let config = (function(){
  let config = {
    build: {
      devtool: false,
    },
    dev: {
      devtool: '#eval-source-map',
    },
  };
  return config[IS_PRODUCTION? 'build' : 'dev']
})();
module.exports = Object.assign(config, {
  mode: IS_PRODUCTION ? 'production': 'development',
  entry: {
    index: path.resolve(__dirname, '../client/src/entries/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, '../node_modules'),
    ],
    extensions: ['.js', '.vue', '.json', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          },
          extractCss: IS_PRODUCTION
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use:[{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            appendTsSuffixTo: [/\.vue$/],
            configFile: 'tsconfig-fe.json'
          }
        }]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
});

function assetsPath (_path) {
  var assetsSubDirectory = 'static';
  return path.posix.join(assetsSubDirectory, _path)
}
