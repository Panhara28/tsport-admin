import { useAuthContext } from '../../../src/components/Authentication/AuthContext';
import { OfficeListScreen } from '../../../src/Screens/HrDepartment/Office/OfficeListScreen';

export default function OfficesPage() {
  const { me } = useAuthContext();

  if (!me?.access?.officeRead) {
    return <p>No Access</p>;
  }

  return <OfficeListScreen />;
}
