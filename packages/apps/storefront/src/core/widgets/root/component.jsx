import React from 'react';
import Component, { fetchers as defaultFetchers } from '@oracle-cx-commerce/react-widgets/root/component';

/**
 * Root component.
 */
const Root = props => {
  return <Component {...props} />;
};

export const fetchers = [...defaultFetchers];
export default Root;
