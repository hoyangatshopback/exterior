const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = false;

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
    // iife: true,
    library: {
      name: 'Exterior',
      type: 'umd'
    },
    globalObject: 'this'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: [/\.scss$/, /\.css$/],
        use: [
          isDevelopment ? 'style-loader' : MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment,
              modules: {
                auto: /\.module\.\w+$/i,
                localIdentContext: path.resolve(__dirname, 'src'),
                localIdentName: '[local]--[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/inline',
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false
    })],
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, 'src/shared/'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
  ]
}
