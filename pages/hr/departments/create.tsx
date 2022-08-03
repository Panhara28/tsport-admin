import { useAuthContext } from '../../../src/components/Authentication/AuthContext';
import { CreateDepartmentScreen } from '../../../src/Screens/HrDepartment/Department/CreateDepartmentScreen';

export default function CreateDepartmentsPage() {
  const { me } = useAuthContext();

  if (!me?.access?.departmentWrite) {
    return <p>No Access</p>;
  }

  return <CreateDepartmentScreen />;
}
