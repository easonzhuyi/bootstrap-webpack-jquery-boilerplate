const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const multipageHelper = require('./multipage-helper.js');

const IS_DEV = process.env.NODE_ENV === 'dev';

const config = {
  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'eval' : 'source-map',
  entry: multipageHelper.getEntries(),
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: IS_DEV
          ? [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ]
          : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader'],
            }),
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'public/[name].[ext]?[hash:7]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: [':data-src'],
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery',
    }),
    new CopyWebpackPlugin([
      {
        from: './public',
        to: 'public',
      },
    ]),
    new ExtractTextPlugin('styles.css'),
    new webpack.HashedModuleIdsPlugin(),
  ],
  optimization: {
    runtimeChunk: {
      name: 'mainfest',
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
    minimizer: [],
  },
};

if (!IS_DEV) {
  config.optimization.minimizer.push(
    new UglifyJsPlugin({
      sourceMap: false,
    })
  );
}

const getHtmlConfig = (name, chunks) => {
  return {
    template: `./src/pages/${name}/${name}.html`,
    filename: `${name}.html`,
    favicon: './public/icon.ico',
    // title: title,
    // inject: true,
    // hash: true, //开启hash
    chunks: chunks, //页面要引入的包
    minify: !IS_DEV && {
      collapseWhitespace: true,
      preserveLineBreaks: true,
      removeComments: true,
    },
  };
};

//自动生成html模板
multipageHelper.getModuleList().forEach(element => {
  config.plugins.push(
    new HtmlWebPackPlugin(
      getHtmlConfig(element.moduleID, ['mainfest', 'vendor', element.moduleID])
    )
  );
});

module.exports = config;
