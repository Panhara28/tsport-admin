import { useRouter } from 'next/router';
import { FormBannerScreen } from '../../../src/Screens/Banner/FormBannerScreen';

export default function EditBannerPage() {
  const route = useRouter();
  return <FormBannerScreen id={Number(route.query.id)} />;
}
