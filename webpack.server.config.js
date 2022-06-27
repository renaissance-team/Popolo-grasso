const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const fs = require('fs');

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
      auto: /\.module\.\w+$/i,
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

const styleLoader = MiniCssExtractPlugin.loader;

module.exports = {
  name: 'server',
  entry: path.resolve(__dirname, './packages/server/server.ts'),
  target: 'node',
  externals: nodeExternals(), //nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] }) - возможно надо так?
  node: {__dirname: false},
  output: {
    path: path.join(__dirname, '/dist/server'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './packages/client/src'),
      '~styles': path.resolve(__dirname, './packages/client/src/styles'),
    },
    modules: ['src', 'node_modules'],
    extensions: moduleFileExtensions.map((ext) => `.${ext}`).filter((ext) => useTypeScript || !ext.includes('ts')),
    plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.json'})],
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
        test: /\.(jpe?g|png|gif|mp3|svg)(\?[a-z0-9=.]+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext][query]',
        },
      },
      {
        test: /\.md$/,
        type: 'asset/source',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new MiniCssExtractPlugin(),
  ],
  devtool: 'source-map',
  performance: {
    hints: devMode ? false : 'warning',
  },
  optimization: {nodeEnv: false},
  stats: devMode && {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
  },
};
