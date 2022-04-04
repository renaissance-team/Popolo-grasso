const path = require('path');

module.exports = {
  root: true,
  extends: 'airbnb',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, './webpack.config.js'),
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  parserOptions: {project: ['./tsconfig.json']},
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-console': ['error', {allow: ['warn', 'disableYellowBox']}],
    'object-curly-spacing': ['error', 'never'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [2, {extensions: ['.js', '.jsx', '.ts', '.tsx']}],
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'max-len': ['error', {code: 120, tabWidth: 2}],
    'react/require-default-props': 0,
  },
  env: {
    browser: true,
  },
};
