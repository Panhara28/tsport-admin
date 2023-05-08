/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CreateProductScreen } from '../../src/Screens/Product/CreateProductScreen';
import { useAuthContext } from '../../src/components/Authentication/AuthContext';
import { TsContent } from '../../src/components/Custom/TsContent';

export default function CreateProductPage() {
  const { me } = useAuthContext();
  if (me.roleId > 2) {
    return <TsContent title="Permission Denied"></TsContent>;
  }
  return <CreateProductScreen />;
}
