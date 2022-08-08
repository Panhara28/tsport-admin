import { useRouter } from 'next/router';
import { EditProductScreen } from '../../../src/Screens/Product/EditProductScreen';

export default function EditProductPage() {
  const router = useRouter();
  return <EditProductScreen id={Number(router.query.id)} />;
}
