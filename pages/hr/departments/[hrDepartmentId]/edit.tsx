import { useRouter } from 'next/router';
import { useAuthContext } from '../../../../src/components/Authentication/AuthContext';
import { CreateDepartmentScreen } from '../../../../src/Screens/HrDepartment/Department/CreateDepartmentScreen';

export default function EditDepartmentsPage() {
  const { me } = useAuthContext();

  if (!me?.access?.departmentModify) {
    return <p>No Access</p>;
  }

  const router = useRouter();
  return <CreateDepartmentScreen userEditId={Number(router.query.hrDepartmentId)} />;
}
