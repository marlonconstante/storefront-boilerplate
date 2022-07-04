/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';

interface HelloWorldProps {
  message: string;
}

const HelloWorld: React.FC<HelloWorldProps> = props => {
  return <h1 className="text-3xl font-bold underline bg-yellow-100 text-red-500">{props.message}</h1>;
};

export default HelloWorld;
