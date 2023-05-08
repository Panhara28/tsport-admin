import { CustomerListScreen } from '../../src/Screens/Customer/CustomerListScreen';
import { useAuthContext } from '../../src/components/Authentication/AuthContext';
import { TsContent } from '../../src/components/Custom/TsContent';

export default function CustomerListPage() {
  const { me } = useAuthContext();

  if (me.roleId > 2) {
    return <TsContent title="Permission Denied"></TsContent>;
  }

  return <CustomerListScreen />;
}
