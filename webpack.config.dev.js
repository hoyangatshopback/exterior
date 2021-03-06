const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = false;

module.exports = {
  entry: {
    'Exterior': path.join(__dirname, 'src/index.js'),
    'SerpLink': path.join(__dirname, 'src/components/SerpLink.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '.',
    library: {
      type: 'umd',
      name: ['[name]'],
      export: 'default',
    },
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
      extractComments: false,
      terserOptions: {
        format: {
          comments: false,
        },
      },
    })],
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, 'src/shared/'),
      '@': path.resolve(__dirname, 'src')
    }
  }
}
