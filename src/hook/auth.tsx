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
      headers: getAuthHeaders(),
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

    const LOGIN_MUTATION = gql`
      mutation signIn($input: SignInInput) {
        signIn(input: $input) {
          token
        }
      }
    `;

    const result = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        input: {
          username,
          password,
        },
      },
    });

    console.log('result', result);

    if (result?.data?.signIn?.token) {
      setAuthToken(result?.data?.signIn?.token);
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
