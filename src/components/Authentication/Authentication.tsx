import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { PropsWithChildren, useContext } from 'react';
import AuthContext from './AuthContext';
import { LoginScreen } from './LoginScreen';
import Notiflix from 'notiflix';
import { TokenContext } from './TokenContext';

const ME = gql`
  query adminMe($websiteId: Int) {
    adminMe(websiteId: $websiteId) {
      id
      fullname
      profilePicture
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

export default function Authentication(props: PropsWithChildren<{}>) {
  const router = useRouter();
  const { token } = useContext(TokenContext);
  const { data, loading } = useQuery(ME, {
    variables: {
      websiteId: Number(router.query.id),
    },
    fetchPolicy: 'no-cache',
    onError: error => {
      if (token === '') {
        Notiflix.Notify.failure('You need to sign in!');
        localStorage.removeItem('token');
      } else if (error) {
        Notiflix.Notify.failure('Please contact your site admin to add you to application!');
        localStorage.removeItem('token');
      }
    },
  });

  if (loading) return <div>Loading...</div>;

  if (data === undefined || data.adminMe === null) {
    return <LoginScreen />;
  }

  if (data && data?.adminMe) {
    return (
      <AuthContext.Provider
        value={{
          me: data?.adminMe,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  }

  return null;
}
