/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import {render, waitForElement, screen} from '@oracle-cx-commerce/test/component/custom-render';
import {createMockStore} from '@oracle-cx-commerce/test/component/create-mock-store';
import Widget from '@oracle-cx-commerce/react-components/widget';
import {preloadComponents} from '@oracle-cx-commerce/commerce-utils/react';
import {_HelloWorld} from '../../index';

test('<HelloWorld/> unit/widget level testing with @testing-library/react', async () => {
  // create a store with the state structure widget rendering needs.
  const mockStore = createMockStore({
    pageRepository: {
      widgets: {
        helloWorldWidget123: {
          helloWorld: 'Hello World',
          id: 'helloWorldWidget123',
          componentId: '_HelloWorld',
          regions: []
        }
      }
    }
  });
  // list of comps to preload (resolves dynamic imports of comps) in node env.
  const comps = {_HelloWorld};
  await preloadComponents(comps);
  // Render helloWorld Widget
  const {container} = render(<Widget widgetId="helloWorldWidget123" />, mockStore, comps);
  // Expect screen to render Below text
  await waitForElement(() => screen.getByText('Hello World'));
  // Take a snapshot of the widget and store it.
  expect(container).toMatchSnapshot();
});
