import { PropsWithChildren } from "react";

export function  Content(props: PropsWithChildren<unknown>) {
  return <>{props.children}</>
}