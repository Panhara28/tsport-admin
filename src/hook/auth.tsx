import React, { useState, useContext, createContext } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink, gql, HttpLink, useQuery } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { createUploadLink } from 'apollo-upload-client';
import { TokenContext } from '../components/Authentication/TokenContext';
import router from 'next/router';
import Notiflix from 'notiflix';
import createApolloClient from '../../libs/client';

const ME = gql`
  query adminMe($websiteId: Int) {
    adminMe(websiteId: $websiteId) {
      id
      fullname
      profilePicture
      contact_city_or_province
      contact_district
      contact_commune
      contact_village
      email
      phoneNumber
      plugins {
        name
        slug
        access {
          read
          create
          edit
          remove
        }
      }
      roleName
      roleId
    }
  }
`;

const authContext = createContext<{ isSignedIn?: any; signOut?: any; signIn?: any; createApolloClient?: any }>({});

export function AuthProvider({ children }: any) {
  const { token } = useContext(TokenContext);

  const auth = useProvideAuth(token);

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient(token)}>{children}</ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth(token?: string) {
  const [authToken, setAuthToken] = useState<any>(token);

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

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

    if (result?.data?.signIn?.token) {
      setAuthToken(result?.data?.signIn?.token);
      process.browser && localStorage.setItem('token', result?.data?.signIn?.token);
      window.location.replace(`/`);
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
