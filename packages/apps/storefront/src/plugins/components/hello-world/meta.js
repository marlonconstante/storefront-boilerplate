/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import { mergeDefaultConfig } from '@oracle-cx-commerce/react-widgets/config';
import config from './config';

export default {
  fetchers: [],
  actions: [],
  resources: {},
  config: mergeDefaultConfig(config)
};
