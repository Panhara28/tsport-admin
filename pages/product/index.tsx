import { ProductListScreen } from '../../src/Screens/Product/ProductListScreen';
import { useAuthContext } from '../../src/components/Authentication/AuthContext';

export default function ProductListPage() {
  const { me } = useAuthContext();

  return <ProductListScreen />;
}
