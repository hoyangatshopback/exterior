const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

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
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    // server: 'https',
    devMiddleware: {
      index: true,
      mimeTypes: { phtml: 'text/html' },
      serverSideRender: true,
      writeToDisk: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false
    })],
  },
}
