// loading component

import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import { colors } from '../utils/constants';

const Root = styled.View`
  flex:1;
  justify-content: center;
  alignItems: center;
`;

export default function Loading({ color = colors.PRIMARY, size = 'large' } = {} ) {
  return (
    <Root>
      <ActivityIndicator size={size} color={color}/>
    </Root>
  )
}
