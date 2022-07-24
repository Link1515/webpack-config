/**
 * for webpack 5
 * require module in line:
 *   npm i -D webpack webpack-cli style-loader css-loader sass sass-loader mini-css-extract-plugin postcss postcss-preset-env postcss-loader html-webpack-plugin webpack-dev-server babel-loader @babel/core @babel/preset-env file-loader eslint eslint-webpack-plugin typescript ts-loader
 *
 * npm script:
 *  "scripts": {
      "build": "NODE_ENV=production webpack",
      "build-dev": "webpack",
      "serve": "webpack serve"
    },
 */

const path = require('path')
// plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

let mode = 'development'
let target = 'web'
if (process.env.NODE_ENV === 'production') {
  mode = 'production'
  target = 'browserslist'
}

module.exports = {
  mode,
  target,
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash:10].js',
    clean: true,
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env']
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset'
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      // <%= htmlWebpackPlugin.options.title %>
      title: 'myTitle',
      filename: 'index.html',
      template: 'src/template.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    }),
    new ESLintPlugin()
  ]
}
