import { useAuthContext } from '../../../src/components/Authentication/AuthContext';
import { DepartmentListScreen } from '../../../src/Screens/HrDepartment/Department/DepartmentListScreen';

export default function DepartmentsPage() {
  const { me } = useAuthContext();

  if (!me?.access?.departmentRead) {
    return <p>No Access</p>;
  }

  return <DepartmentListScreen />;
}
