import { useRouter } from 'next/router';
import { AssignUserRoleScreen } from '../../../../../src/Screens/Users/AssignUserRoleScreen';

export default function AssignUserRolePage() {
  const router = useRouter();
  return <AssignUserRoleScreen userEditId={Number(router.query.userEditId)} />;
}
