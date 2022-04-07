import { PropsWithChildren } from "react";

export function AppContainer(props: PropsWithChildren<unknown>) {
  return <>{props.children}</>
}