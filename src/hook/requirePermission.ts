import { useAuthContext } from '../components/Authentication/AuthContext';

type requirePermissionProps = {
  permissions?: string[];
};

export default function requirePermission({ permissions }: requirePermissionProps) {
  const { me } = useAuthContext();

  let isAllowed = false;

  if (permissions.find(x => x === me.roleName)) {
    isAllowed = true;
  }

  return isAllowed;
}
