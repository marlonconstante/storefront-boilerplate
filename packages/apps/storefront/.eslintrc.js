/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

/**
 * Configuration file for the ESLint utility (https://eslint.org)
 */
/* eslint-env node */
module.exports = {
  extends: '@oracle-cx-commerce/eslint-config/apps',
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
  env: {
    node: true
  }
};
