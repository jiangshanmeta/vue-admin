process.traceDeprecation = true
const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

const env = process.env.NODE_ENV;
const defineBaseConfig = require("../config/define.base.conf.js");
const defineEnvConfig = require("../config/define." + (env === 'development'? 'dev':'prod') + ".conf.js" );
const defineConfig = Object.assign({},defineBaseConfig,defineEnvConfig);
const defineKeys = Object.keys(defineConfig);
defineKeys.forEach(function(field){
  defineConfig[field] = JSON.stringify(defineConfig[field])
})

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json',".ts",".css"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'), 
          resolve('test'),
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'ts-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },

    ]
  },
  plugins:[
    new VueLoaderPlugin(),
    new webpack.DefinePlugin(defineConfig),
  ]
}
