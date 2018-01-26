import * as webpack from 'webpack';
import { root } from './helpers';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const TS_VERSION = require('typescript').version;
const extractSASS = new ExtractTextPlugin('[name]-sass.css');

export default function(options: any): any {
  const Environment = require(root('src', 'environments', options.APP_ENV)).default;
  const environment = new Environment();

  return {
    entry: {
      main: root('src', 'main.ts'),
      css: root('src', 'styles', 'application.scss'),
    },
    output: {
      path: root('build', options.APP_ENV),
      filename: '[name].[hash].bundle.js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[name]-[id].[chunkhash].chunk.js',
    },

    resolve: {
      extensions: ['.ts', '.js', '.json'],
    },
    module: {
      exprContextCritical: false,
      rules: [
        { test: /\.json$/, use: 'json-loader' },
        { test: /\.(jpg|png|gif)$/, use: 'file-loader' },
        { test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/, use: 'file-loader' },
        { test: /\.css$/, use: 'raw-loader' },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: false,
              },
            },
          ],
        },
        {
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre',
          exclude: [],
        },
        {
          test: /\.scss$/,
          use: extractSASS.extract({
            fallback: 'raw-loader',
            use: [
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'postcss-loader', options: { sourceMap: true } },
              { loader: 'sass-loader', options: { sourceMap: true } },
            ],
          }),
          include: root('src', 'styles'),
        },
      ],
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new FriendlyErrorsWebpackPlugin(),

      // load the configuration for the current environment (development, staging, production ...)
      new webpack.NormalModuleReplacementPlugin(
        /src[/\\]environments\/development.ts/,
        root('src', 'environments', options.APP_ENV + '.ts')
      ),

      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        environment,
        inject: 'body',
      }),

      new webpack.optimize.CommonsChunkPlugin({
        minChunks: 2,
        children: true,
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
      }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(options.ENV),
        // tslint:disable-next-line:object-literal-key-quotes
        ENV: JSON.stringify(options.ENV),
        // tslint:disable-next-line:object-literal-key-quotes
        TS_VERSION: JSON.stringify(TS_VERSION),
      }),

      new CopyWebpackPlugin([
        {
          from: 'src/assets/favicon.ico',
          to: 'assets',
        },
        {
          from: 'src/assets/home-1.png',
          to: 'assets',
        },
        {
          from: 'src/manifest.json',
          to: '',
        },
        { from: 'src/_redirects', to: '' },
      ]),

      extractSASS,
    ],
  };
}
