import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '../../../../../src/components/Authentication/AuthContext';
import { PeopleScreen } from '../../../../../src/Screens/websites/PeopleScreen';

export default function People() {
  const router = useRouter();
  const { me } = useContext(AuthContext);
  if (me.roleName != 'Site Administrator') {
    router.push('/no-permission');
  }
  return <PeopleScreen />;
}
