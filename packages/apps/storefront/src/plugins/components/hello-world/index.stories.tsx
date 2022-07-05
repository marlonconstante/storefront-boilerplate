import React from 'react';
import Component from '.';

const Template = args => <Component {...args} />;

export const HelloWorld = Template.bind({});
HelloWorld.args = {
  message: 'Hello world!'
};

export default {
  title: 'components/HelloWorld',
  component: Component,
  parameters: {
    layout: 'fullscreen'
  }
};
