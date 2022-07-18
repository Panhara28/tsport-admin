import { useRouter } from 'next/router';
import { CreateGeneralDepartmentScreen } from '../../../../src/Screens/HrDepartment/GeneralDepartment/CreateGeneralDepartmentScreen';

export default function UserEditPage() {
  const router = useRouter();
  return <CreateGeneralDepartmentScreen userEditId={Number(router.query.hrDepartmentId)} />;
}
