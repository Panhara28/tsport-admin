import { useAuthContext } from '../../../src/components/Authentication/AuthContext';
import { CreateGeneralDepartmentScreen } from '../../../src/Screens/HrDepartment/GeneralDepartment/CreateGeneralDepartmentScreen';

export default function CreateGeneralDepartmentsPage() {
  const { me } = useAuthContext();

  if (!me?.access?.generalDepartmentWrite) {
    return <p>No Access</p>;
  }
  return <CreateGeneralDepartmentScreen />;
}
