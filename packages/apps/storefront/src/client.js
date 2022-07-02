/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {createClient} from '@oracle-cx-commerce/react-app/client';
import * as actions from './plugins/actions';
import * as components from './plugins/components';
import * as endpoints from './plugins/endpoints';
import * as subscribers from './plugins/subscribers';

createClient({
  actions,
  components,
  endpoints,
  subscribers
}).then(client => client.start());
