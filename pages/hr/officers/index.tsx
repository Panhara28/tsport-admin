import { useAuthContext } from '../../../src/components/Authentication/AuthContext';
import { HrEmployeeListScreen } from '../../../src/Screens/HrEmployee/HrEmployeeListScreen';

export default function HrEmployeeListPage() {
  const { me } = useAuthContext();

  if (!me?.access?.officerRead) {
    return <p>No Access</p>;
  }

  return <HrEmployeeListScreen />;
}
