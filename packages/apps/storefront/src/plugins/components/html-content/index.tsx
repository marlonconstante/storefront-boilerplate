/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';

interface HtmlContentProps {
  src: string;
}

const HtmlContent: React.FC<HtmlContentProps> = props => {
  return <div dangerouslySetInnerHTML={{ __html: props.src }} />;
};

export default HtmlContent;
