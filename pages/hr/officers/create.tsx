import { useAuthContext } from '../../../src/components/Authentication/AuthContext';
import { CreateHrEmployeeScreen } from '../../../src/Screens/HrEmployee/CreateHrEmployeeScreen';

export default function CreateHrEmployeePage() {
  const { me } = useAuthContext();

  if (!me?.access?.officerWrite) {
    return <p>No Access</p>;
  }

  return <CreateHrEmployeeScreen />;
}
