/*
 ** Copyright (c) 2021 Oracle and/or its affiliates.
 */

/**
 * Add _additional_ `<meta>` tags to the `index.html`.
 *
 * @param {import('express').Request} req Current SSR request
 * @param {import('express').Response} res Current SSR response
 * @returns {String} Additional meta HTML
 */
export const meta = (/*req, res*/) => {
  return ``;
};

/**
 * Add _additional_ PWA tags to the `index.html`.
 *
 * @param {import('express').Request} req Current SSR request
 * @param {import('express').Response} res Current SSR response
 * @returns {String} Additional PWA HTML
 */
export const pwa = (/*req, res*/) => {
  return ``;
};

/**
 * Add _additional_ `<link>` tags to the `index.html`.
 *
 * @param {import('express').Request} req Current SSR request
 * @param {import('express').Response} res Current SSR response
 * @returns {String} Additional link HTML
 */
export const link = (/*req, res*/) => {
  return ``;
};

/**
 * Add _additional_ style sheets to the `index.html`.
 *
 * @param {import('express').Request} req Current SSR request
 * @param {import('express').Response} res Current SSR response
 * @returns {String} Additional style HTML
 */
export const style = (/*req, res*/) => {
  return ``;
};

/**
 * Add _additional_ `<script>` tags to the `index.html`.
 *
 * @param {import('express').Request} req Current SSR request
 * @param {import('express').Response} res Current SSR response
 * @returns {String} Additional script HTML
 */
export const script = (/*req, res*/) => {
  return ``;
};

/**
 * Append HTML `<body>` of the `index.html`.
 *
 * @param {import('express').Request} req Current SSR request
 * @param {import('express').Response} res Current SSR response
 * @returns {String} Additional body HTML
 */
export const body = (/*req, res*/) => {
  return ``;
};
