import React, { PropsWithChildren, useState } from 'react';
import { AppContainer } from '../../components/AppContainer';
import { Content } from '../../components/Content';

export default function AppScreen(props: PropsWithChildren<{}>) {
  return (
    <AppContainer>
      <Content>{props.children}</Content>
    </AppContainer>
  );
}
