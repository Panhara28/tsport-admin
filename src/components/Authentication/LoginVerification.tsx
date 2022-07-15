import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { PropsWithChildren, useContext } from 'react';
import AuthContext from './AuthContext';
import { LoginScreen } from './LoginScreen';
import Notiflix from 'notiflix';
import { TokenContext } from './TokenContext';

const ME = gql`
  query adminMe($clientToken: String) {
    adminMe(clientToken: $clientToken) {
      id
      fullname
      profilePicture
      roleName
      roleId
    }
  }
`;

export default function LoginVerification(props: PropsWithChildren<{}>) {
  const router = useRouter();
  const { token } = useContext(TokenContext);

  const { data, loading } = useQuery(ME, {
    variables: {
      clientToken: token,
    },
    fetchPolicy: 'no-cache',
    onError: error => {
      if (token === '') {
        Notiflix.Notify.failure('You need to sign in!');
      } else if (error) {
        Notiflix.Notify.failure('Please contact your site admin to add you to application!');
        localStorage.removeItem('token');
        window.location.reload();
      }
    },
  });

  if (loading || !data) return <div>Loading...</div>;

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
