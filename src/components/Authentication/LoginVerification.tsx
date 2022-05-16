import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { PropsWithChildren, useContext } from 'react';
import AuthContext from './AuthContext';
import { LoginScreen } from './LoginScreen';
import Notiflix from 'notiflix';
import { TokenContext } from './TokenContext';
import SignIn from '../SignIn';

const ME = gql`
  query adminMe($websiteId: Int, $clientToken: String) {
    adminMe(websiteId: $websiteId, clientToken: $clientToken) {
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

export default function LoginVerification(props: PropsWithChildren<{}>) {
  const router = useRouter();
  const { token } = useContext(TokenContext);

  const { data, loading } = useQuery(ME, {
    variables: {
      websiteId: Number(router.query.id),
      clientToken: token,
    },
    fetchPolicy: 'no-cache',
    onError: error => {
      if (token === '') {
        Notiflix.Notify.failure('You need to sign in!');
      } else if (error) {
        Notiflix.Notify.failure('Please contact your site admin to add you to application!');
      }
    },
  });

  if (loading || !data) return <div>Loading...</div>;
  console.log('data', data);

  if (data === undefined || data.adminMe === null) {
    return <SignIn />;
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
