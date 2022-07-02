/*
 ** Copyright (c) 2021 Oracle and/or its affiliates.
 */

module.exports = {
  fetch: {
    additionalForwardingHeaders: [
      // Header names list. The OSF server will read these headers from the
      // incoming requests and add them in requests to external services.
    ]
  }
};
