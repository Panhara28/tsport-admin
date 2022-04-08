import { ApolloProvider } from '@apollo/client';
import { PropsWithChildren, useMemo } from 'react';
import createApolloClient from '../../../libs/client';
import { useToken } from './TokenContext';

export default function ApolloContext(props: PropsWithChildren<{}>) {
  const { token } = useToken();
  const client = useMemo(() => createApolloClient(token), [token]);
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}