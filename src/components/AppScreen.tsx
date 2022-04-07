import React, { PropsWithChildren, useState } from "react";
import { AppContainer } from "./AppContainer";
import { Content } from "./Content";

export default function AppScreen(props: PropsWithChildren<{}>) {
  return (
    <AppContainer>
      <Content>{props.children}</Content>
    </AppContainer>
  );
}
