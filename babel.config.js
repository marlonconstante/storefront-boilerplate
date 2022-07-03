/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

/* eslint-env node */
module.exports = {
  extends: '@oracle-cx-commerce/babel-config',
  plugins: [
    ['module-resolver', {
      'alias': {
        '@core': 'storefront/src/core',
        '@plugins': 'storefront/src/plugins'
      }
    }]
  ]
};
