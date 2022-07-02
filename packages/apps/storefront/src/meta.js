/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import {createMeta} from '@oracle-cx-commerce/react-app/meta';
import * as actions from './plugins/actions/meta';
import * as components from './plugins/components/meta';
import * as endpoints from './plugins/endpoints/meta';
import * as subscribers from './plugins/subscribers/meta';
import pkg from '../package.json';

const {name: packageId, description, occ: {namespace} = {}} = pkg;

export default createMeta({
  packageId,
  description,
  namespace,
  actions,
  components,
  endpoints,
  subscribers
});
