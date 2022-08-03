import { useAuthContext } from '../../../src/components/Authentication/AuthContext';
import { CreateOfficeScreen } from '../../../src/Screens/HrDepartment/Office/CreateOfficeScreen';

export default function CreateOfficesPage() {
  const { me } = useAuthContext();

  if (!me?.access?.officeWrite) {
    return <p>No Access</p>;
  }

  return <CreateOfficeScreen />;
}
