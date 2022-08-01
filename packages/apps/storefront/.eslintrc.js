/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

/**
 * Configuration file for the ESLint utility (https://eslint.org)
 */
/* eslint-env node */

const prettierConfig = require('../../../.prettierrc');

module.exports = {
  extends: [
    '@oracle-cx-commerce/eslint-config/apps',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@core', 'storefront/src/core'],
          ['@plugins', 'storefront/src/plugins']
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'prettier/prettier': ['error', prettierConfig],
    'react/no-danger': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  },
  env: {
    node: true
  }
};
