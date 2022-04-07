import React, { PropsWithChildren, useState } from 'react';
import { AppContainer } from '../../components/Layouts/AppContainer';
import { Content } from '../../components/Layouts/Content';

export default function AppScreen(props: PropsWithChildren<{}>) {
  return (
    <AppContainer>
      <Content>{props.children}</Content>
    </AppContainer>
  );
}
