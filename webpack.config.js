const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const os = require('os');

const isDevelopment = false;

module.exports = (env, argv) => {
  const username = os.userInfo().username;
  const whaleExtPath = env.path || '/Shopback/xtg/whale-ext/';

  return {
    entry: {
      // 'Exterior': path.join(__dirname, 'src/index.js'),
      'SerpLink': path.join(__dirname, 'src/components/SerpLink.js'),
      'Todo': path.join(__dirname, 'src/components/Todo.js'),
      'ClickMe': path.join(__dirname, 'src/components/ClickMe.js'),
    },
    output: {
      // path: path.join(__dirname, 'dist'),
      path: path.join('/Users', username, whaleExtPath, 'extension'),
      filename: '[name].js',
      publicPath: '.',
      library: {
        type: 'umd',
        name: ['[name]'],
        export: 'default',
      },
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
        '@': path.resolve(__dirname, 'src'),
      }
    },
    plugins: [
      new MiniCSSExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
      }),
    ],
    externals: {
      // "styled-components": {
      //   commonjs: "styled-components",
      //   commonjs2: "styled-components",
      //   amd: "styled-components",
      // },
    },
  }
} 
