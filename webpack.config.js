const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const PORT = process.env.PORT || 3002;
const fs = require('fs');
const devMode = process.env.NODE_ENV !== 'production';

const devMode = process.env.NODE_ENV !== 'production';

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

const useTypeScript = fs.existsSync(__dirname, 'tsconfig.json');

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      mode: 'local',
      getLocalIdent: getCSSModuleLocalIdent,
    },
    importLoaders: 2,
    sourceMap: false,
  },
};

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: 'global',
    importLoaders: 2,
    sourceMap: false,
  },
};

const PostCSSLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      ident: 'postcss',
      sourceMap: false,
      plugins: () => [
        autoprefixer({
          flexbox: 'no-2009',
        }),
      ],
    },
  },
};

const styleLoader = devMode ? 'style-loader' : MiniCssExtractPlugin.loader;

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: moduleFileExtensions.map((ext) => `.${ext}`).filter((ext) => useTypeScript || !ext.includes('ts')),
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [styleLoader, CSSLoader, PostCSSLoader, 'sass-loader'],
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [styleLoader, CSSModuleLoader, PostCSSLoader, 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)(\?[a-z0-9=.]+)?$/,
        type: 'asset/inline',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
        type: 'asset/inline',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)(\?[a-z0-9=.]+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
  ],
  devServer: {
    compress: true,
    port: PORT,
    open: true,
    hot: true,
    allowedHosts: 'all',
  },
  devtool: 'source-map',
};
