const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const APP_DIR = path.resolve(__dirname, './src/index.jsx');
const BUILD_DIR = path.resolve(__dirname, './dist');
const TEMPLATE_DIR = path.resolve(__dirname, './src/template/template.index.html');
const ENV_DIR = path.resolve(__dirname, './client.env');

let cleanOptions = {
  verbose: true,
};

module.exports = {
  entry: {
    app: APP_DIR,
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], cleanOptions),
    new HTMLWebpackPlugin({
      template: TEMPLATE_DIR,
      inject: 'body',
    }),
    new Dotenv({
      path: ENV_DIR,
      safe: false,
    }),
    new UglifyJSPlugin({
      sourceMap: false,
      uglifyOptions: { ecma: 8 },
    })
  ]
};