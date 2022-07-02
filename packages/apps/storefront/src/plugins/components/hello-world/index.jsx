/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {t} from '@oracle-cx-commerce/utils/generic';
import css from './styles.css';

const HelloWorld = props => {
  const {helloWorld} = props;

  return (
    <Styled id="HelloWorld" css={css}>
      <div className="HelloWorld">{t(helloWorld)}</div>
    </Styled>
  );
};

export default HelloWorld;
