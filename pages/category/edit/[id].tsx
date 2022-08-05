import { useRouter } from 'next/router';
import { CreateCategoryScreen } from '../../../src/Screens/Category/CreateCategoryScreen';

export default function EditCategoryPage() {
  const router = useRouter();
  return <CreateCategoryScreen id={Number(router.query.id)} />;
}
