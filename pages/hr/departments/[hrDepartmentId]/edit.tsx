import { useRouter } from 'next/router';
import { CreateDepartmentScreen } from '../../../../src/Screens/HrDepartment/Department/CreateDepartmentScreen';

export default function EditDepartmentsPage() {
  const router = useRouter();
  return <CreateDepartmentScreen userEditId={Number(router.query.hrDepartmentId)} />;
}
