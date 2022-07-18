import { useRouter } from 'next/router';
import { CreateOfficeScreen } from '../../../../src/Screens/HrDepartment/Office/CreateOfficeScreen';

export default function EditDepartmentsPage() {
  const router = useRouter();
  return <CreateOfficeScreen userEditId={Number(router.query.hrDepartmentId)} />;
}
