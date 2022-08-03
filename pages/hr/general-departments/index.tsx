import { useAuthContext } from '../../../src/components/Authentication/AuthContext';
import { GeneralDepartmentListScreen } from '../../../src/Screens/HrDepartment/GeneralDepartment/GeneralDepartmentListScreen';

export default function GeneralDepartmentsPage() {
  const { me } = useAuthContext();

  if (!me?.access?.generalDepartmentRead) {
    return <p>No Access</p>;
  }

  return <GeneralDepartmentListScreen />;
}
