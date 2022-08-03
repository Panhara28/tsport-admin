import { useRouter } from 'next/router';
import { useAuthContext } from '../../../../src/components/Authentication/AuthContext';
import { CreateHrEmployeeScreen } from '../../../../src/Screens/HrEmployee/CreateHrEmployeeScreen';

export default function UserEditPage() {
  const { me } = useAuthContext();

  if (!me?.access?.officerModify) {
    return <p>No Access</p>;
  }

  const router = useRouter();
  return <CreateHrEmployeeScreen userEditId={Number(router.query.hrEmployeeId)} />;
}
