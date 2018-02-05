import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';

import { hasProcessFlag, root } from './helpers';
import commonConfig from './webpack.common';

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const ENV = (process.env.ENV = process.env.NODE_ENV = 'development');
const HMR = hasProcessFlag('hot');
const AOT = false;
const APP_ENV = process.env.APP_ENV || ENV;

const options = { AOT, ENV, HMR, APP_ENV };

export default webpackMerge(commonConfig(options), {
  devtool: 'cheap-module-eval-source-map',

  output: {
    chunkFilename: '[name]-[id].chunk.js',
    filename: '[name].bundle.js',
    path: root('build', 'development'),
    sourceMapFilename: '[file].map',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          // activate on larger project, slower for small setup
          // { loader: 'cache-loader' },
          // {
          //   loader: 'thread-loader',
          //   options: {
          //     workers: Math.max(require('os').cpus().length - 3, 2),
          //   },
          // },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              transpileOnly: true,
              configFile: 'tsconfig.dev.json',
            },
          },
        ],
        exclude: [/\.(spec|e2e)\.ts$/],
      },
    ],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: root('tsconfig.dev.json'),
      checkSyntacticErrors: true,
      tslint: true,
      watch: ['./src'],
    }),
  ],

  devServer: {
    port: 3002,
    host: '0.0.0.0',
    historyApiFallback: true,
    // quiet: true,
    watchOptions: {
      // if you're using Docker you may need this
      // aggregateTimeout: 300,
      // poll: 1000,
      ignored: /node_modules/,
    },
  },
}) as webpack.Configuration;
