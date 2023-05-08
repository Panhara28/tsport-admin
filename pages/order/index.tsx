import { OrderListScreen } from '../../src/Screens/Order/OrderListScreen';
import { useAuthContext } from '../../src/components/Authentication/AuthContext';
import { TsContent } from '../../src/components/Custom/TsContent';

export default function OrderPage() {
  const { me } = useAuthContext();

  if (me.roleId > 2) {
    return <TsContent title="Permission Denied"></TsContent>;
  }

  return <OrderListScreen />;
}
