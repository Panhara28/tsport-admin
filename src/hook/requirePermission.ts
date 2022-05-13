import { useContext } from 'react';
import AuthContext, { useAuthContext } from '../components/Authentication/AuthContext';

type requirePermissionProps = {
  permissions?: string[];
};

export default function RequirePermission({ permissions }: requirePermissionProps) {
  const { me } = useContext(AuthContext);

  let isAllowed = false;

  if (permissions?.find(x => x === me.roleName)) {
    isAllowed = true;
  }

  return isAllowed;
}
