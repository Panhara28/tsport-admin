import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import AuthContext from '../../../../../../../src/components/Authentication/AuthContext';
import { PeopleRoleScreen } from '../../../../../../../src/Screens/websites/PeopleRoleScreen';

export default function PeopleRole() {
  const router = useRouter();
  const { me } = useContext(AuthContext);
  if (me.roleName != 'Site Administrator') {
    router.push('/no-permission');
  }
  return <PeopleRoleScreen />;
}
