import { useRouter } from 'next/router';
import { useAuthContext } from '../../../../src/components/Authentication/AuthContext';
import { CreateGeneralDepartmentScreen } from '../../../../src/Screens/HrDepartment/GeneralDepartment/CreateGeneralDepartmentScreen';

export default function UserEditPage() {
  const { me } = useAuthContext();

  if (!me?.access?.generalDepartmentModify) {
    return <p>No Access</p>;
  }

  const router = useRouter();
  return <CreateGeneralDepartmentScreen userEditId={Number(router.query.hrDepartmentId)} />;
}
