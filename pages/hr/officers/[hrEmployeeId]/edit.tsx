import { useRouter } from 'next/router';
import { CreateHrEmployeeScreen } from '../../../../src/Screens/HrEmployee/CreateHrEmployeeScreen';

export default function UserEditPage() {
  const router = useRouter();
  return <CreateHrEmployeeScreen userEditId={Number(router.query.hrEmployeeId)} />;
}
