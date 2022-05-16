import React, { useState, useContext, createContext } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink, gql, HttpLink } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { createUploadLink } from 'apollo-upload-client';

const authContext = createContext<{ isSignedIn?: any; signOut?: any; signIn?: any; createApolloClient?: any }>({});

export function AuthProvider({ children }: any) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>{children}</ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null);

  const getAuthHeaders = () => {
    console.log('getAuthHeaders', authToken);

    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

  function createApolloClient() {
    const link = new HttpLink({
      uri: 'http://localhost:8080',
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }

  const signOut = () => {
    setAuthToken(null);
  };

  const signIn = async ({ username, password }: any) => {
    const client = createApolloClient();
    const LoginMutation = gql`
      mutation LoginMutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
        }
      }
    `;
    const result = await client.mutate({
      mutation: LoginMutation,
      variables: { username, password },
    });

    console.log(result);

    if (result?.data?.login?.token) {
      setAuthToken(result.data.login.token);
    }
  };

  const isSignedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  return {
    createApolloClient,
    signIn,
    signOut,
    isSignedIn,
  };
}
