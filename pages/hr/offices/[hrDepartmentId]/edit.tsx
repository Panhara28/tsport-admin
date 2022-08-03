import { useRouter } from 'next/router';
import { useAuthContext } from '../../../../src/components/Authentication/AuthContext';
import { CreateOfficeScreen } from '../../../../src/Screens/HrDepartment/Office/CreateOfficeScreen';

export default function EditDepartmentsPage() {
  const { me } = useAuthContext();

  if (!me?.access?.officeModify) {
    return <p>No Access</p>;
  }

  const router = useRouter();
  return <CreateOfficeScreen userEditId={Number(router.query.hrDepartmentId)} />;
}
