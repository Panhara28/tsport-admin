import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '../../../../src/components/Authentication/AuthContext';
import { AddPeopleToWebsiteScreen } from '../../../../src/Screens/websites/AddPeopleToWebsiteScreen';

export default function AddPeople() {
  const router = useRouter();
  const { me } = useContext(AuthContext);
  if (me.roleName != 'Site Administrator') {
    router.push('/no-permission');
  }
  return <AddPeopleToWebsiteScreen />;
}
