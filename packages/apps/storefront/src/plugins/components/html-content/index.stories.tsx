import React from 'react';
import Component from '.';

const Template = args => <Component {...args} />;

export const HtmlContent = Template.bind({});
HtmlContent.args = {
  src: '<p class="px-4 py-2 text-lg text-blue-500 bg-blue-50">Any <strong>paragraph</strong> of text</p>'
};

export default {
  title: 'components/HtmlContent',
  component: Component,
  parameters: {
    layout: 'fullscreen'
  }
};
