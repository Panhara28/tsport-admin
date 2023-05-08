import CategoryListScreen from '../../src/Screens/Category/CategoryListScreen';
import { useAuthContext } from '../../src/components/Authentication/AuthContext';
import { TsContent } from '../../src/components/Custom/TsContent';

export default function CategoryListPage() {
  const { me } = useAuthContext();

  if (me.roleId > 1) {
    return <TsContent title="Permission Denied"></TsContent>;
  }

  return <CategoryListScreen />;
}
