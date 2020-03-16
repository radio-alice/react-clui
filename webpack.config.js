/* global __dirname, require, module*/
const webpack = require('webpack')
const path = require('path')
const { argv: args } = require('yargs')

const isProd = args.mode === 'production'

let plugins = [new webpack.NamedModulesPlugin()]

const libraryName = 'react-clui'

const config = {
  entry: {
    [libraryName]: [path.join(__dirname, 'src/index.ts')]
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: isProd ? '[name].min.js' : '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    // Required to create single build for Node and web targets
    // FIXME: https://github.com/webpack/webpack/issues/6522
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js', '.ts', '.tsx']
  },
  plugins: plugins
}

module.exports = config
